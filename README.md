
# Atlan Challenge Solution
by Bhaskar Sharma

# Set Up: 

1. Run npm install
2. Open a 2 CMDs 
    One for Server for API’s
    One for Execution Service
3.Commands
    npm run dev (starts API Server in Dev Mode)
    npm run dev-es (starts Execution Service in Dev Mode)
    npm start (start API Server in Standalone mode)
    npm run start-es (start Execution Service in standalone mode)

# Postman Link: https://www.postman.com/spaceflight-geologist-9668923/workspace/atlan/collection/31551786-04460cd3-4ae6-4280-81e9-57dc30bc9505?action=share&creator=31551786


# Problem Statement Interpretation

 Forms with questions are used in the process of data collection
 After a user fills the form, the responses hit the datastore
There is some post submission logic that needs to be executed
These Post Submission Business Logic Use Cases  are called as Actions in my implementation


# Tasks
* Create a Schematic of Forms, Questions, Responses
* Create a System that executes a list of post-submission logics in a plug and play fashion


# Thought Process

* There should be a Form Entity that contains a list of questions
* Users should be able to respond to these questions in form of responses
* After receiving responses, two steps happen
* Save them in a datastore
* Execute all the relevant actions to this particular form

We could have done this synchronously as well, i.e do this all one after the other, but that would introduce some issues as it would block our application and make it slow. It would act as a bottleneck.

Alternatively, we can separate the two steps(saving form and running actions) so that both tasks are independent of each other and can be scaled individually


# Solution

I have implemented the second solution.

We have two services in our solution,

* A core server that exposes API to create, update and submit forms
* A dedicated execution service, that executes the Post-Submission Business Logic Use-Cases(Actions)

To make it asynchronous(As we are expecting eventual consistency and a fault-tolerant, scalable app), I have Used Kafka as the Message-Relaying System


# Schemas

actionList contains ID of actions that need to be executed for each form.
 For Example: 1: saveResponseToGoogleSheet, 2: sendMailToParticipant
Action Parameters are configurable parameters pertaining to each handler
For Example: googleSheetLink

#  Questions and Responses are mapped using an array
  This is done for simplicity for now
  This can be updated to have them dynamically mapped using question Id


# Architecture and Workflow






Upon submitting a response, the Submission API performs the following actions:

* Creates a Response Object.
* Saves the object in the database.
* Publishes it to the designated Kafka Topic.
The Execution Service, equipped with a Kafka Consumer for the same topic, processes the messages and executes all actions listed in the Form's Action List. To enhance flexibility, a Feature Switch has been added to toggle the behavior of the Consumer at the Execution Service. Two modes are available:

1.Single Message at a Time:

Pros: Simple error handling, ability to set the order of Actions.
Cons: Slower, time-consuming, and potentially blocking.

2.Batch Processing Grouped on FormID:

Pros: Faster processing.
Cons: More complex error handling, no guaranteed order of Actions.

In case any Action encounters a failure, a Kafka Exception Catcher captures the error. The system then routes the failed Action to another Kafka Topic. Utilizing a CRON Job, these failed Actions can be reprocessed at regular intervals, ensuring a robust and fail-safe solution.

This architecture proves particularly beneficial in overcoming third-party bottlenecks. For instance, in scenarios like the Google Sheet use case, where only 60 writes per minute are allowed, any additional updates can be reprocessed using the fail-safe mechanism. Similarly, for use cases like sending an email to participants as a receipt, the fail-safe feature ensures that any transient failures are addressed and resolved over time.



# Plug and Play Paradigm

To introduce a new use-case:

Develop a handler for the corresponding action and associate it with a unique numeric ID.
Include this pairing in both the ActionMap and ActionLookup.
Update the action list of the specific form intending to implement this use-case using the provided endpoint.
Completed! It's as straightforward as that.


# Testing

I conducted a manual performance test simulating the submission of n responses to our form. 

For n=200, the Execution Pipeline, handling 2 implemented actions with zero failures, 
completed in under 4 minutes. 

The adoption of batch processing significantly enhanced performance, as compared to the previous single processing approach, which took 10 minutes for n=100.

