/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This sample shows how to create a simple Trivia skill with a multiple choice format. The skill
 * supports 1 player at a time, and does not support games across sessions.
 */

'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var questions = [
    {
        "Who said, 'I am altering the deal. Pray I don't alter it any further.'?": [
            "Darth Vader.",
            "Jabba the Hutt.",
            "Grand Moff Tarkin.",
            "Lando Calrissian.",
            "Darth Sidious."
        ]
    },
    {
        "What was the original name of 'Return of the Jedi'?": [
            "Revenge of the Jedi.",
            "The New Republic.",
            "The End of the Empire.",
            "The End of the Sith."
        ]
    },
    {
        "Who killed Jango Fett?": [
            "Mace Windu.",
            "Obi Wan Kenobi.",
            "Qui Gon Jinn.",
            "Luke Skywalker."
        ]
    },
    {
        "Who played Lando Calrissian?": [
            "Billy Dee Williams.",
            "Carl Weathers.",
            "Eddie Murphy.",
            "John Williams."
        ]
    },
    {
        "Who was the concept artist who helped George Lucas with the look and feel of Star Wars?": [
            "Ralph McQuarrie.",
            ".",
            "Luke Skywalker.",
            "Leia Skywalker.",
            "Obi-Wan Kenobi."
        ]
    },
    {
        "Who said, 'Why, you slimy, double-crossing, no-good swindler.'?": [
            "Lando Calrissian.",
            "Han Solo.",
            "Luke Skywalker.",
            "Leia Skywalker.",
            "Obi-Wan Kenobi."
        ]
    },
    {
        "Whose DNA was used in the creation of the Clone Army in Episode Two: Attack of the Clones?": [
            "Jango Fett.",
            "Boba Fett.",
            "Darth Vader.",
            "Darth Maul.",
            "Darth Sidious."
        ]
    },
    {
        "Which of these was not one of Darth Sidious' Sith apprentices?": [
            "General Greivous.",
            "Darth Maul.",
            "Darth Vader.",
            "Darth Tyranus.",
            "Darth Plagueis."
        ]
    },
    {
        "Who's the only rebel pilot to survive all three movies in the original trilogy besides Luke Skywalker?": [
            "Wedge Antilles.",
            "Jek Porkins.",
            "Biggs Darklighter.",
            "Garven Dreis.",
            "John D. Branon."
        ]
    },
    {
        "Where was Luke Skywalker originally headed to pick up power converters?": [
            "Tosche Station.",
            "Mos Eisley Space Station.",
            "Mos Eisley Cantina.",
            "Tusken Village.",
            "Mos Espa"
        ]
    },
    {
        "Darth Vader's chestpiece has some writing on it. What language is it in, and what does it translate to?": [
            "His deeds will not be forgiven, until he merits.",
            "To whom much is given, much is tested.",
            "I live, I die. I live again.",
            "Through strength, I gain power.",
            "Through power, I gain victory."
        ]
    },
    {
        "Who originally commanded the Death Star in Episode Four: A New Hope?": [
            "Grand Moff Tarkin",
            "Darth Vader",
            "Admiral Conan Antonio Motti",
            "General Trech Molock",
            "Colonel Wullf Yularen"
        ]
    },
    {
        "Who is Lando Calrissian's co-pilot in Episode Six: Return of the Jedi?": [
            "Nien Nunb",
            "Han Solo",
            "Chewbacca",
            "Wedge Antilles",
            "Admiral Ackbar"
        ]
    },
    {
        "What odds does C-3P0 give Han Solo for successfully navigating an asteroid field?": [
            "3,720 to 1.",
            "10,000 to 1.",
            "5,000 to 1.",
            "5,720 to 1.",
            "2,720 to 1."
        ]
    },
    {
        "Which species stole plans to the Death Star in Return of the Jedi?": [
            "Bothans",
            "Ewoks",
            "Wookiees",
            "Banthas",
            "Jawas"
        ]
    },
    {
        "What is the Wookiee home world?": [
            "Kashyyyk",
            "Endor",
            "Tattoine",
            "Jakku",
            "Alderan"
        ]
    },
    {
        "How many languages can C3PO speak": [
            "Over six million",
            "Five thousand",
            "One million",
            "Five million",
            "Two million"
        ]
    },
    {
        "What were Luke's aunt and uncle's job on Tatooine?": [
            "Moisture Farmers",
            "Spice Farmers",
            "Traders",
            "Pod Racer Mechanics",
            "Bantha Milk Farmers"
        ]
    },
    {
        "How many Star Wars movies has Jar Jar Binks been in?": [
            "3",
            "2",
            "4",
            "1",
            "0"
        ]
    },
    {
        "What species is Jar Jar Binks?": [
            "Gungan",
            "Human",
            "Ewok",
            "Droid"
        ]
    },
    {
        "What color are Jar Jar Binks' eyes?": [
            "Yellow",
            "Green",
            "Blue",
            "Pink",
            "Orange",
            "Dead Inside.",
            "The color of a television that is tuned to a dead channel."
        ]
    },
    {
        "Did Han shoot first?": [
            "Yes",
            "No",
            "Maybe",
            "Who Cares.",
            "No, George Lucas did."
        ]
    },
    {
        "What type of creature ensnares Luke in the garbage trap on the Death Star in Star Wars: A New Hope?": [
            "Dianoga",
            "Gungan",
            "Bantha",
            "Rodian",
            "Hutt"
        ]
    },
    {
        "What type of droid is R2-D2?": [
            "Astromech Droid",
            "Sentinel Droid",
            "3PO Unit",
            "Smelter Droid"
        ]
    },
    {
        "What does TIE in TIE Fighter stand for?": [
            "Twin Ion Engines",
            "Twin Inescapable Engines",
            "Turbo Interactive Engines",
            "Twin Interactive Engines"
        ]
    },
    {
        "What color is the light saber that Luke Skywalker constructs in episode six?": [
            "Green",
            "Blue",
            "Red",
            "Purple"
        ]
    },
    {
        "What color is Mace Windu's light saber?": [
            "Purple",
            "Blue",
            "Red",
            "Purple"
        ]
    },
    {
        "What Does AT-AT stand for?": [
            "All Terrain Armored Transport",
            "All Terrain Attack Transport",
            "All Terrain Attack Tank",
            "All Terrain Armored Tank"
        ]
    },
    {
        "What Does AT-ST stand for?": [
            "All Terrain Scout Transport",
            "All Terrain Simple Transport",
            "All Terrain Scout Tank",
            "All Terrain Simple Tank"
        ]
    },
    {
        "What type of vehicle do the rebels use to take down AT-ATs in Star Wars: The Empire Strikes Back?": [
            "Snowspeeders",
            "X-Wings",
            "B-Wings",
            "A-Wings"
        ]
    },
    {
        "Who is Lando Calrissian's Co-Pilot when he destroys the Death Star in Star Wars: Return of the Jedi?": [
            "Nien Nunb",
            "Chewbacca",
            "Han Solo",
            "Admiral Ackbar"
        ]
    },
    {
        "Who is the character who has the famous line \"It's a trap!\" in Star Wars: Return of the Jedi?": [
            "Admiral Ackbar",
            "Han Solo",
            "Luke Skylwalker",
            "Leia Skywalker"
        ]
    },
    {
        "What is the name of the pit where Jabba takes Luke Skywalker and Han Solo t be killed in Star Wars: Return of the Jedi?": [
            "Pit of Carkoon",
            "Pit of Sarlacc",
            "Pit of Tattooine",
            "Pit of Hutt"
        ]
    },
    {
        "What is the name of the creature which resides in the Pit of Carkoon?": [
            "Sarlacc",
            "Bossk",
            "Greedo",
            "Nien Nunb"
        ]
    },
    {
        "What is the name of Boba Fett's ship in Star Wars: Return of the Jedi?": [
            "Slave II",
            "Slave I",
            "Slave",
            "Slave III"
        ]
    },
    {
        "Which bounty hunter successfully captures Han Solo in Star Wars: The Empire Strikes Back?": [
            "Boba Fett",
            "Jango Fett",
            "IG-88",
            "Bossk",
            "Dengar"
        ]
    },
    {
        "What type of creature does Luke Skylwalker battle in Jabba the Hutt's palace in Star Wars: Return of the Jedi?": [
            "Rancor",
            "Dianoga",
            "Bantha",
            "Kowakian Monkey Lizard"
        ]
    },
    {
        "What is the name of Jabba the Hutt's jester in Star Wars: Return of the Jedi?": [
            "Salacious Crumb",
            "Nien Nunb",
            "Max Rebo",
            "Sy Snoodles"
        ]
    },
    {
        "What is the name of the band at Jabba the Hutt's palace in Star Wars: Return of the Jedi?": [
            "The Max Rebo Band",
            "Salacious Crumb and Co.",
            "Jabba's Jammers",
            "Palace Rockers"
        ]
    },
];

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

        if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.17fbb6d9-1456-4add-be84-2cb6dff3008b") {
            return context.fail("Invalid Application ID");
         }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

// ------- Skill specific business logic -------

var ANSWER_COUNT = 4;
var GAME_LENGTH = 5;
var CARD_TITLE = "Star Wars Trivia"; // Be sure to change this for your skill.

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "Star Wars Trivia. I will ask you " + GAME_LENGTH.toString()
            + " questions, try to get as many right as you can. Just say the number of the answer. Let's begin. ",
        shouldEndSession = false,

        gameQuestions = populateGameQuestions(),
        correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), // Generate a random index for the correct answer, from 0 to 3
        roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex),

        currentQuestionIndex = 0,
        spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0],
        repromptText = "Question 1. " + spokenQuestion + " ",

        i, j;

    for (i = 0; i < ANSWER_COUNT; i++) {
        repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
    }
    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "correctAnswerIndex": correctAnswerIndex + 1,
        "questions": gameQuestions,
        "score": 0,
        "correctAnswerText":
            questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function populateGameQuestions() {
    var gameQuestions = [];
    var indexList = [];
    var index = questions.length;

    if (GAME_LENGTH > index){
        throw "Invalid Game Length.";
    }

    for (var i = 0; i < questions.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < GAME_LENGTH; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}

function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
    // Get the answers for a given question, and place the correct answer at the spot marked by the
    // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
    // only ANSWER_COUNT will be selected.
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

    // Shuffle the answers, excluding the first element.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else if (!answerSlotValid && !userGaveUp) {
        // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
        // return an error message to the user. Remember to guide the user into providing correct values.
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Your answer must be a number between 1 and " + ANSWER_COUNT + ". " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;

        var speechOutputAnalysis = "";

        if (answerSlotValid && parseInt(intent.slots.Answer.value) == correctAnswerIndex) {
            currentScore++;
            speechOutputAnalysis = "correct. ";
        } else {
            if (!userGaveUp) {
                speechOutputAnalysis = "wrong. "
            }
            speechOutputAnalysis += "The correct answer is " + correctAnswerIndex + ": " + correctAnswerText + ". ";
        }
        // if currentQuestionIndex is 4, we've reached 5 questions (zero-indexed) and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                + GAME_LENGTH.toString() + " questions correct. Thank you for playing!";
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));
        } else {
            currentQuestionIndex += 1;
            var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0];
            // Generate a random index for the correct answer, from 0 to 3
            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

                questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText = "Question " + questionIndexForSpeech.toString() + ". " + spokenQuestion + " ";
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
            }
            speechOutput += userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "Your score is " + currentScore.toString() + ". " + repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "score": currentScore,
                "correctAnswerText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
            };
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
        }
    }
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
    // Provide a help prompt for the user, explaining how the game is played. Then, continue the game
    // if there is one in progress, or provide the option to start another one.

    // Set a flag to track that we're in the Help state.
    session.attributes.userPromptedToContinue = true;

    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

    var speechOutput = "I will ask you " + GAME_LENGTH + " multiple choice questions. Respond with the number of the answer. "
        + "For example, say one, two, three, or four. To start a new game at any time, say, start game. "
        + "To repeat the last question, say, repeat. "
        + "Would you like to keep playing?",
        repromptText = "To give an answer to a question, respond with the number of the answer . "
        + "Would you like to keep playing?";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return answerSlotIsInt && parseInt(intent.slots.Answer.value) < (ANSWER_COUNT + 1) && parseInt(intent.slots.Answer.value) > 0;
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}
