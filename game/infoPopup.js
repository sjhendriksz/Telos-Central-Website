//-----------------------------------------------------------------------------------
//Function to the Telos Info
//-----------------------------------------------------------------------------------
function TelosInfo(){
        this.W = width/gameScale*4/5;
        this.H = height/gameScale*7/8;
        this.x = 0 + ((width/gameScale-this.W)/2);
        this.y = 0 + ((height/gameScale-this.H)/2);
        this.displayWin = false;
        this.heading = "";
        this.message = "";
        this.question = "";
        this.answers = [];
        this.questionButtons = [];
        this.linkButtons = [];
        this.continueButton;
        this.answerFail = null;
        this.textS = 0;

        this.draw = function(){
            
            // Display the information once the I sign is reached.
            //if(this.displayWin && infoObj.isFound && !flagPoleObj.flagpole.isReached){
            // Temp code, to show popup when the I buttons is pressed
        	if(this.displayWin && !flagPoleObj.flagpole.isReached){
                // Dimm the Background
                fill(0,0,0,150);
                rect(0,0, width/gameScale, height/gameScale);
                textSize(this.textS);

                // Draw the template
                stroke(orangeText);
                strokeWeight(5);
                fill(backgroundCol);
                rect(this.x, this.y, this.W, this.H, 10);
                
                // Display the relevant text
                callInfo("A", gameLevels);
                
                // Draw the buttons
                this.continueButton.draw();
                
                // Close the this window
                if(this.continueButton.isPressed){
                    this.displayWin = false;
                    this.continueButton.isPressed = false;
                }
                                
                // Draw the link buttons, if any.
                for(var i = 0; i < this.linkButtons.length; i++){
                    this.linkButtons[i].draw();
                }
            }
            
            // Display the questions once the Wizard is reached.
            else if(this.displayWin && flagPoleObj.flagpole.isReached){
                // Dimm the Background
                fill(0, 0, 0, 150);
                rect(0,0, width/gameScale, height/gameScale);
                textSize(this.textS);

                // Draw the template
                stroke(orangeText);
                strokeWeight(5);
                fill(backgroundCol);
                rect(this.x, this.y, this.W, this.H, 10);
                
                // Display the relevant text
                callInfo("Q", gameLevels);
                
                // Draw the buttons for all levels, except level 12
                if(gameLevels != 12){
                    this.continueButton.draw();

                    // Conditions to continue
                    var cA;
                    var cA1;
                    var indexNum;
                    for(var i = 0; i < this.questionButtons.length; i++)
                    {
                        this.questionButtons[i].draw();
                        cA = this.questionButtons[i].textInfo;
                        cA1 = cA.substring(cA.length-1, cA.length);
                        if(cA1 == " "){
                            indexNum = i;
                        }
                    }
                    if(this.continueButton.isPressed && this.questionButtons[indexNum].isPressed == true){
                        answerCorrect = true;
                    }
                    else if(this.continueButton.isPressed && this.questionButtons[indexNum].isPressed == false){
                        this.answerFail = true;
                        falseSound.play();
                        this.continueButton.isPressed = false;
                    }

                    // Answer correct.
                    if(answerCorrect == true){
                        this.displayWin = false;
                        this.continueButton.isPressed = false;
                        gameLevels += 1;
                    }
                    else if(answerCorrect == false && this.answerFail == true)
                    {
                        fill(255,0,0);
                        textAlign(CENTER, CENTER);
                        text("False, try again.", this.x+this.W/2, this.y+this.H-100);
                    }
                    
                }
            }
            
            // Change the cursor when over button
            var btnHoverCount = 0;
            for(var i = 0; i < this.linkButtons.length; i++){
                if(this.linkButtons[i].isHovering){
                    btnHoverCount += 1;
                }
            }
            if(btnHoverCount == 1 || this.continueButton.isHovering){
                cursor(HAND);
            }else{
                cursor(ARROW);
            }
                
        },
        
        this.setup = function(levelNum){
            // Calculate the textsize
            this.textS = (sqrt(width*height)*0.02)/gameScale;
            
            // Continue - CreateConButton(x, y, btnWidth, textInfo, textS)
            textSize(this.textS);
            var continueButtonText = "Continue"
            var continueButtonTextWidth = textWidth(continueButtonText);
            this.continueButton = new CreateConButton(this.x + this.W, this.y+this.H-70, continueButtonTextWidth, continueButtonText, this.textS);
            //this.continueButton.setup();
            
            // Level 1 info and questions - Introduction
            if(levelNum == 1){
                this.heading = "The Telos Blockchain - Introduction.";
                this.message = "Telos is a blockchain powered by the EOSio protocol, with the native cryptocurrency \ncalled Telos and the symbol TLOS. \n\nThe EOSio software was first released on 1 June 2017 and is continually being \nimproved and developed by the private company block.one. \n\nTelos is a Greek word that means 'the ultimate purpose of a thing.'' \nAristotle used the example that ''The telos of an acorn is to become an oak tree.'' \n\nThis is also the inspiration behind the original Telos symbol, an acorn. \n\nLearn more by clicking the links below.";

                this.question = "What's the meaning of the word Telos?";
                // Empty the array
                this.answers = [];
                this.answers.push("To be one with the universe.");
                this.answers.push("To push yourself to to the limit.");
                this.answers.push("To reach your full potential.");
                this.answers.push("The ultimate purpose of a thing. ");
                
                // Link Info Buttons. CreateButton(x, y, btnWidth, textInfo, link)
                // Empty the array
                this.linkButtons = [];
                
                // Set the textsize before calculating the textWidth
                textSize(this.textS);
                var linkButton1Text = "Telos Website"
                var linkButton1TextWidth = textWidth(linkButton1Text);
                this.linkButtons.push(new CreateButton(this.x + 30, this.y + this.H - 70, linkButton1TextWidth+10, linkButton1Text, this.textS, "https://www.telosfoundation.io"));

                var linkButton2Text = "Explore Telos.Net"
                var linkButton2TextWidth = textWidth(linkButton2Text);
                this.linkButtons.push(new CreateButton(this.x + 30 + linkButton1TextWidth + 40, this.y + this.H - 70, linkButton2TextWidth+10, linkButton2Text, this.textS, "https://explore.telos.net/"));
                
                /*var linkButton3Text = "Telos Central Web Directory"
                var linkButton3TextWidth = textWidth(linkButton3Text);
                this.linkButtons.push(new CreateButton(this.x + 30 + linkButton1TextWidth + 40 + linkButton2TextWidth + 40, this.y + this.H - 70, linkButton3TextWidth+10, linkButton3Text, this.textS, "https://teloscentral.com/"));*/

                // Question buttons.
                // Empty the array
                this.questionButtons = [];
                for(var i = 0; i < this.answers.length; i++){
                    var buttonY = this.y + this.H*2/10 + 75*i;
                    this.questionButtons.push(new CreateButton(this.x+25, buttonY, this.W-60, this.answers[i]));
                }
            }
            
            // Level 2 one questions and answers - Basic History
            else if(levelNum == 2){
                this.heading = "The Telos Blockchain - Basic History.";
                this.message = "Telos is a third-generation, foundation blockchain. \n\nBitcoin was the first blockchain ever (making it, its forks like Bitcoin Cash, Gold & SV, \nas well as all the chains that utilized the Bitcoin source code like Litecoin, Dash, etc. \nfirst generation blockchains) and was invented in 2008 by an unknown person or \ngroup of people using the name Satoshi Nakamoto and started in 2009 when its \nsource code was released as open-source software. \n\nBitcoins are created as a reward for a process known as mining and miners run the \nhardware required to process Bitcoin transactions. \n\nThe average number of transactions per second on the Bitcoin network is less than 5, \nand once that limit is exceeded, transaction fees start rising as they have in December \n2017 where you had to pay close to $50 per transaction. \n\nBitcoin was originally developed as a decentralized payment system, but with the limited \ntransaction throughput and high fees, it never would have worked as a payment system and \nBitcoin gradually transitioned to being a store of value, often referred to as digital gold.";

                this.question = "What's the average number of transactions per second on the \nBitcoin network?";
                this.answers = [];
                this.answers.push("< 5. ");
                this.answers.push("> 5.");
                this.answers.push("> 25.");
                this.answers.push("< 35.");
                
                // Link Info Buttons. CreateButton(x, y, btnWidth, textInfo, link)
                // Empty the array
                this.linkButtons = [];
                
                // Set the textsize before calculating the textWidth
                textSize(this.textS);
                var linkButton1Text = "Bitcoin statistics"
                var linkButton1TextWidth = textWidth(linkButton1Text);
                this.linkButtons.push(new CreateButton(this.x + 30, this.y + this.H - 70, linkButton1TextWidth+10, linkButton1Text, this.textS, "https://www.blockchain.com/en/charts"));
                
                var linkButton2Text = "Bitcoin TPS"
                var linkButton2TextWidth = textWidth(linkButton2Text);
                this.linkButtons.push(new CreateButton(this.x + 30 + linkButton1TextWidth + 40, this.y + this.H - 70, linkButton2TextWidth+10, linkButton2Text, this.textS, "https://www.blockchain.com/en/charts/transactions-per-second"));
                
                // Question buttons.
                // Empty the array
                this.questionButtons = [];
                for(var i = 0; i < this.answers.length; i++){
                    var buttonY = this.y + this.H*2/10 + 75*i;
                    this.questionButtons.push(new CreateButton(this.x+25, buttonY, this.W-60, this.answers[i]));
                }
            }
            
            // Level 3 one questions and answers - Basic History
            else if(levelNum == 3){
                this.heading = "The Telos Blockchain - Basic History.";
                this.message = "In the previous level, you learned that Telos is a 3rd generation, foundation platform, but \nwhat exactly does that mean? \n\nBitcoin is a first-generation blockchain. Ethereum is a second-generation blockchain and \nalso the first foundation platform. A foundation platform is similar to an operating system. \nIn other words, it forms the foundation on which other applications can be built. \n\n\Another way to think about it would be to compare it to computers today. In order to use a \nspreadsheet application like Excel, you first need an operating system like Windows. \nExcel is the application and Windows is the foundation. \n\nEven with the new functionality and opportunities that Ethereum brought to the blockchain \nspace, transaction fees and its limited transaction throughput of to an average of only 15 \ntransaction per seconds, ultimately prevented the development of large scale, decentralized \napplications (aka: dApps) on the Ethereum network. Ethereum is now most famously used \nas a fundraising platform in the form of ICOs (Initial Coin Offerings), the most successful \nICO ever being the block.one ICO who developed the EOSio software.";

                this.question = "What's the average number of transactions per second on the \nEthereum network?";
                this.answers = [];
                this.answers.push("± 5.");
                this.answers.push("± 25.");
                this.answers.push("± 15. ");
                this.answers.push("± 35.");
                
                // Link Info Buttons. CreateButton(x, y, btnWidth, textInfo, link)
                // Empty the array
                this.linkButtons = [];
                
                // Set the textsize before calculating the textWidth
                textSize(this.textS);
                var linkButton1Text = "Ethereum statistics"
                var linkButton1TextWidth = textWidth(linkButton1Text);
                this.linkButtons.push(new CreateButton(this.x + 30, this.y + this.H - 70, linkButton1TextWidth+10, linkButton1Text, this.textS, "https://etherscan.io/charts"));
                
                var linkButton2Text = "Ethereum TPS"
                var linkButton2TextWidth = textWidth(linkButton2Text);
                this.linkButtons.push(new CreateButton(this.x + 30 + linkButton1TextWidth + 40, this.y + this.H - 70, linkButton2TextWidth+10, linkButton2Text, this.textS, "https://etherscan.io/chart/tx"));
                
                // Question buttons.
                // Empty the array
                this.questionButtons = [];
                for(var i = 0; i < this.answers.length; i++){
                    var buttonY = this.y + this.H*2/10 + 75*i;
                    this.questionButtons.push(new CreateButton(this.x+25, buttonY, this.W-60, this.answers[i]));
                }
            }
            
            // Level 4 one questions and answers - Blockchain protocols Part 1
            else if(levelNum == 4){
                this.heading = "The Telos Blockchain - Blockchain protocols Part 1.";
                this.message = "There are quite a few different consensus protocols in the blockchain universe, but we'll only cover the main 3 \nin this level, namely: \n    1:  PoW - Proof of work \n    2:  PoS - Proof of stake \n    3:  DPoS - Delegated proof of stake. \n\nThe Bitcoin and Ethereum networks utilize the POW protocol and are run by miners, which \nis essentially specialized computers (known as ASICs - Application-Specific Integrated Circuit) \nthat process the transactions on the network. Ethereum uses a different algorithm, which \nmakes ASICs inefficient and utilizing GPUs (Graphics Processing Unit) is still the most \nefficient way to mine Ether (Ether is the native cryptocurrency of Ethereum). \n\nThese ASICs and GPUs are very energy-intensive and the combined network uses an \nastonishing amount of electricity. Currently, the mining equipment that powers the Bitcoin \nnetwork uses almost as much electricity as the entire country of Belgium. \n\nThe POW protocol goes against the efforts of reducing global carbon emissions. \nTelos uses the DPos consensus  protocol, which we'll cover in the next level.";

                this.question = "Which protocol does the Telos blockchain utilize?";
                this.answers = [];
                this.answers.push("DPoS. ");
                this.answers.push("PoS.");
                this.answers.push("PoW.");
                this.answers.push("PoET.");
                
                // Link Info Buttons. CreateButton(x, y, btnWidth, textInfo, link)
                // Empty the array
                this.linkButtons = [];
                
                // Set the textsize before calculating the textWidth
                textSize(this.textS);
                var linkButton1Text = "Bitcoin energy consumption"
                var linkButton1TextWidth = textWidth(linkButton1Text);
                this.linkButtons.push(new CreateButton(this.x + 30, this.y + this.H - 70, linkButton1TextWidth+10, linkButton1Text, this.textS, "https://www.cbeci.org/comparisons/"));
                
                var linkButton2Text = "Ethereum energy consumption"
                var linkButton2TextWidth = textWidth(linkButton2Text);
                this.linkButtons.push(new CreateButton(this.x + 30 + linkButton1TextWidth + 40, this.y + this.H - 70, linkButton2TextWidth+10, linkButton2Text, this.textS, "https://digiconomist.net/ethereum-energy-consumption"));
                
                // Question buttons.
                // Empty the array
                this.questionButtons = [];
                for(var i = 0; i < this.answers.length; i++){
                    var buttonY = this.y + this.H*2/10 + 75*i;
                    this.questionButtons.push(new CreateButton(this.x+25, buttonY, this.W-60, this.answers[i]));
                }
            }
            
            // Level 5 one questions and answers - Blockchain protocols Part 2
            else if(levelNum == 5){
                this.heading = "The Telos Blockchain - Blockchain protocols Part 2.";
                this.message = "Telos uses the DPos consensus protocol and this protocol solves the 3 biggest problems \nthat's been plaguing mass adoption and the development of large scale, blockchain-based, \ndecentralized applications namely:     1:  Low transaction throughput.\n                                                            2:  High transaction costs.\n                                                            3:  High energy consumption.\n\nTelos has a block time of half a second, which is incredibly fast compared to the 10 minute \nblock time of Bitcoin. \n\nThe exact number of transactions per second that the Telos network can handle is unknown, \nbut it is estimated to be in the thousands. To date, the most transactions the Telos network has \nprocessed in a day is 32 million, which is the second most transactions ever done in a day by \nany blockchain. This equates to 370 TPS, and that's not even close to reaching the maximum \ncapacity. It's estimated that Visa processes roughly 1700 TPS. \n\nTransactions, as well as account creation on the Telos network, is free and it uses but a fraction \nof the electricity. A rough guess would be that the entire Telos network uses about as much \nelectricity as 10 average households.";

                this.question = "How long does it take for a transaction to get processed on Telos?";
                this.answers = [];
                this.answers.push("30 seconds.");
                this.answers.push("5 minutes.");
                this.answers.push("0.5 seconds. ");
                this.answers.push("10 minutes.");
                
                // Link Info Buttons. CreateButton(x, y, btnWidth, textInfo, link)
                // Empty the array
                this.linkButtons = [];
                
                // Set the textsize before calculating the textWidth
                textSize(this.textS);
                var linkButton1Text = "Telos Intro Video"
                var linkButton1TextWidth = textWidth(linkButton1Text);
                this.linkButtons.push(new CreateButton(this.x + 30, this.y + this.H - 70, linkButton1TextWidth+10, linkButton1Text, this.textS, "https://www.youtube.com/watch?v=s4yXXZKoAMo"));
                
                var linkButton2Text = "TLOS transactions"
                var linkButton2TextWidth = textWidth(linkButton2Text);
                this.linkButtons.push(new CreateButton(this.x + 30 + linkButton1TextWidth + 40, this.y + this.H - 70, linkButton2TextWidth+10, linkButton2Text, this.textS, "https://www.blocktivity.info/"));
                
                // Question buttons.
                // Empty the array
                this.questionButtons = [];
                for(var i = 0; i < this.answers.length; i++){
                    var buttonY = this.y + this.H*2/10 + 75*i;
                    this.questionButtons.push(new CreateButton(this.x+25, buttonY, this.W-60, this.answers[i]));
                }
            }
            
            // Level 6 one questions and answers - DPos & BPs Voting Proxy
            else if(levelNum == 6){
                this.heading = "The Telos Blockchain - DPos & BPs.";
                this.message = "Transactions on Telos are free, but in order to make transactions, you need to own TLOS \ncoins which you need to stake in return for network resources. Network resources is what \nenables you to make transactions and it's worth noting that the full ammount of the original \nstaked TLOS coins are still available to you and can be retrieved at any time, but has a 3 \nday unstaking period before they become liquid again and can be transferred. \n\nTelos resources consists of RAM, CPU and Network Bandwidth and you can learn more \nabout it by clicking on the 'Telos Resources' button below. \n\nThe Telos network is governed by 21 active and 30 standby Block Producers, or BPs for short. \nBlock producers are voted for by the TLOS token holder and the voting power of the TLOS \ntoken holder is equivalent to the ammount of TLOS tokens that are staked for network resources, \nor deposited into the 'Telos Resource Exchange', T-REX for short. More on this later. \n\nEvery TLOS token holder can vote for up to 30 block producers and voting is inversely weighted, \nmeaning that if you don't vote for the full 30 BPs, your tokens have less voting power. \nIf you're unsure who to vote for, you can also proxy your vote.";

                this.question = "Which protocol does the Telos blockchain utilize?";
                this.answers = [];
                this.answers.push("DPoS. ");
                this.answers.push("PoS.");
                this.answers.push("PoW.");
                this.answers.push("PoET.");
                
                // Link Info Buttons. CreateButton(x, y, btnWidth, textInfo, link)
                // Empty the array
                this.linkButtons = [];
                
                // Set the textsize before calculating the textWidth
                textSize(this.textS);
                var linkButton1Text = "Telos BPs Video"
                var linkButton1TextWidth = textWidth(linkButton1Text);
                this.linkButtons.push(new CreateButton(this.x + 30, this.y + this.H - 70, linkButton1TextWidth+10, linkButton1Text, this.textS, "https://www.youtube.com/watch?v=vBHN9Egf7-Y"));
                
                var linkButton2Text = "Telos BP benchmarks"
                var linkButton2TextWidth = textWidth(linkButton2Text);
                this.linkButtons.push(new CreateButton(this.x + 30 + linkButton1TextWidth + 40, this.y + this.H - 70, linkButton2TextWidth+10, linkButton2Text, this.textS, "https://www.alohaeos.com/tools/benchmarks#networkId=5&timeframeId=5"));
                
                var linkButton3Text = "Telos Resources"
                var linkButton3TextWidth = textWidth(linkButton3Text);
                this.linkButtons.push(new CreateButton(this.x + 30 + linkButton1TextWidth + 40 + linkButton2TextWidth + 40, this.y + this.H - 70, linkButton3TextWidth+10, linkButton3Text, this.textS, "https://telosrp.github.io/"));
                
                // Question buttons.
                // Empty the array
                this.questionButtons = [];
                for(var i = 0; i < this.answers.length; i++){
                    var buttonY = this.y + this.H*2/10 + 75*i;
                    this.questionButtons.push(new CreateButton(this.x+25, buttonY, this.W-60, this.answers[i]));
                }
            }
            
            // Level 7 one questions and answers - T-REX
            else if(levelNum == 7){
                this.heading = "The Telos Blockchain - The Telos Resource Exchange (T-REX).";
                this.message = "Since network resources are required to perform actions on the Telos blockchain, demand for \nthese resources will increase as more and more dApps (Decentralized Applications) are \ndeployed on the network. \n\nDapp developers require resources in order to support the userbase of their applications. \nAs the userbase grows, more network resources are required. The average token holder \nnormally has a lot more TLOS tokens available than network resources required. \nThis is where the Telos Resource Exchange (T-REX for short) comes in. Token holders can \nlend their tokens to dApp developers and receive interest in return. \n\nThe Telos Resource Exchange currently has an annual return of roughly 20%. This value \ncan decrease or increase depending on the number of tokens available for lending in the \nresource exchange, as well as the demand for resources from dApp developers. \n\nYou migth be asking at this point, how do I actually do the stuff that's been covered thus far. \nDon't worry, we'll get to that soon.";

                this.question = "How much interest can you earn by lending your TLOS \ntokens to the resource exchange?";
                this.answers = [];
                this.answers.push("20%.");
                this.answers.push("It depends on the Demand.");
                this.answers.push("It depends on the number of tokens in the T-REX.");
                this.answers.push("All of the above. ");
                
                // Link Info Buttons. CreateButton(x, y, btnWidth, textInfo, link)
                // Empty the array
                this.linkButtons = [];
                
                // Set the textsize before calculating the textWidth
                textSize(this.textS);
                var linkButton1Text = "T-REX Video"
                var linkButton1TextWidth = textWidth(linkButton1Text);
                this.linkButtons.push(new CreateButton(this.x + 30, this.y + this.H - 70, linkButton1TextWidth+10, linkButton1Text, this.textS, "https://www.youtube.com/watch?v=pLhJ0qLPjk4"));
                
                var linkButton2Text = "T-REX Statistics"
                var linkButton2TextWidth = textWidth(linkButton2Text);
                this.linkButtons.push(new CreateButton(this.x + 30 + linkButton1TextWidth + 40, this.y + this.H - 70, linkButton2TextWidth+10, linkButton2Text, this.textS, "https://eosauthority.com/rex/statistics?network=telos"));
                
                var linkButton3Text = "T-REX User Guide"
                var linkButton3TextWidth = textWidth(linkButton3Text);
                this.linkButtons.push(new CreateButton(this.x + 30 + linkButton1TextWidth + 40 + linkButton2TextWidth + 40, this.y + this.H - 70, linkButton3TextWidth+10, linkButton3Text, this.textS, "https://medium.com/telos-foundation/telos-users-guide-understanding-telos-rex-d94d081cd7bb"));
                
                // Question buttons.
                // Empty the array
                this.questionButtons = [];
                for(var i = 0; i < this.answers.length; i++){
                    var buttonY = this.y + this.H*2/10 + 75*i;
                    this.questionButtons.push(new CreateButton(this.x+25, buttonY, this.W-60, this.answers[i]));
                }
            }
            
            // Level 8 one questions and answers - Worker Proposals
            else if(levelNum == 8){
                this.heading = "The Telos Blockchain - Worker Proposals (WP).";
                this.message = "The Telos worker proposal system is a source of funding that is available to dApp developers. \ndApp developers, marketing specialist, just about anyone that can think of a way to add value \nto the Telos blockchain can submit a proposal onto the blockchain, which then becomes \navailable for review by the Telos token holders. \n\nTelos token holders can then vote YES, NO or ABSTAIN based on how much value they think \nthe project will add to the Telos ecosystem. The proposal needs to have a majority YES votes \nand a minimum threshold of 5% in order to pass. \n\nThis gives you as an investor and token holder ultimate power and a voice as to which \ndirection the chain should be moving to. The worker proposal system is a double edged soard \nin that it's great for the development of the ecosystems, but it also adds selling pressure to the \ntoken price, so it's really important to partake in the process to ensure the best proposals \ngets approved at reasonable funding requests. \n\nGo and have a look at the list of worker proposals by clicking on the 'WP List' button below. \nAlso check out the video for more information.";

                this.question = "How much interest can you earn by lending your TLOS \ntokens to the resource exchange?";
                this.answers = [];
                this.answers.push("20%.");
                this.answers.push("It depends on the Demand.");
                this.answers.push("It depends on the number of tokens in the T-REX.");
                this.answers.push("All of the above. ");
                
                // Link Info Buttons. CreateButton(x, y, btnWidth, textInfo, link)
                // Empty the array
                this.linkButtons = [];
                
                // Set the textsize before calculating the textWidth
                textSize(this.textS);
                var linkButton1Text = "WP Video "
                var linkButton1TextWidth = textWidth(linkButton1Text);
                this.linkButtons.push(new CreateButton(this.x + 30, this.y + this.H - 70, linkButton1TextWidth+10, linkButton1Text, this.textS, "https://www.youtube.com/watch?v=UGngydghAzM"));
                
                var linkButton2Text = "WP List"
                var linkButton2TextWidth = textWidth(linkButton2Text);
                this.linkButtons.push(new CreateButton(this.x + 30 + linkButton1TextWidth + 40, this.y + this.H - 70, linkButton2TextWidth+10, linkButton2Text, this.textS, "https://chainspector.io/governance"));
                
                var linkButton3Text = "WP User Guide"
                var linkButton3TextWidth = textWidth(linkButton3Text);
                this.linkButtons.push(new CreateButton(this.x + 30 + linkButton1TextWidth + 40 + linkButton2TextWidth + 40, this.y + this.H - 70, linkButton3TextWidth+10, linkButton3Text, this.textS, "https://medium.com/telos-foundation/telos-user-guide-understanding-worker-proposals-ef5df8ee2a17"));
                
                // Question buttons.
                // Empty the array
                this.questionButtons = [];
                for(var i = 0; i < this.answers.length; i++){
                    var buttonY = this.y + this.H*2/10 + 75*i;
                    this.questionButtons.push(new CreateButton(this.x+25, buttonY, this.W-60, this.answers[i]));
                }
            }
            
            // Level 9 one questions and answers - Wallets
            else if(levelNum == 9){
                this.heading = "The Telos Blockchain - Wallets.";
                this.message = "Congratulations on making it this far. \
                \n\n\This is the level where things get interesting. Firstly you need to download the SQRL wallet by \nclicking on the 'SQRL Wallet' button below. Choose a download link based on your operating \nsystem and follow the installation steps.\
                \n\n\Your wallet is your gateway to the Telos blockchain and with the SQRL wallet, you can do \neverything from voting for block producers, to opening a free account and buying tokens directly \nfrom the wallet, as well as vote on worker proposals and more.\
                \n\n\At this point, in addition to the SQRL wallet, I would also like to introduce you to the Telos Central \nweb directory, where we've been keeping track of everything about Telos.\
                \n\n\If you're unsure how to use the wallet, you'll find video tutorials on just about everything. \nJoin the social media groups that are listed here, download one of the mobile wallets and keep \non discovering just how much Telos has accomplished in a very short period of time.\
                \n\n\Click on the 'Telos Central' button below to learn more.";

                this.question = "What can the SQRL wallet be used for?";
                this.answers = [];
                this.answers.push("Making transactions.");
                this.answers.push("Creating free accounts.");
                this.answers.push("Vote for BPs and worker proposals.");
                this.answers.push("All of the above. ");
                
                // Link Info Buttons. CreateButton(x, y, btnWidth, textInfo, link)
                // Empty the array
                this.linkButtons = [];
                
                // Set the textsize before calculating the textWidth
                textSize(this.textS);
                var linkButton1Text = "SQRL Wallet"
                var linkButton1TextWidth = textWidth(linkButton1Text);
                this.linkButtons.push(new CreateButton(this.x + 30, this.y + this.H - 70, linkButton1TextWidth+10, linkButton1Text, this.textS, "https://sqrlwallet.io/earn/?refer=teloscentral"));
                
                var linkButton2Text = "Telos Central"
                var linkButton2TextWidth = textWidth(linkButton2Text);
                this.linkButtons.push(new CreateButton(this.x + 30 + linkButton1TextWidth + 40, this.y + this.H - 70, linkButton2TextWidth+10, linkButton2Text, this.textS, "https://teloscentral.com/"));
                
                // Question buttons.
                // Empty the array
                this.questionButtons = [];
                for(var i = 0; i < this.answers.length; i++){
                    var buttonY = this.y + this.H*2/10 + 75*i;
                    this.questionButtons.push(new CreateButton(this.x+25, buttonY, this.W-60, this.answers[i]));
                }
            }
            
            // Level 10 one questions and answers - Airdrops
            else if(levelNum == 10){
                this.heading = "The Telos Blockchain - Airdrops.";
                this.message = "If you've been involved with cryptocurrencies and blockchain for a while, I'm sure you've \nheard of ICO's, an acronym for Initial Coin Offerings. We covered this briefly in level 3, \nbut it's basically a way for developers to sell an idea in order to raise money to bring that \nidea to realization and is mostly done on the Ethereum blockchain.\
                \n\n\In truth though, very few ICO's live up to their promise, in fact, less than 5% actually \ndeliver a working product, so ICO's are probably the riskiest investment you could \nmake, but with the EOSio ecosystem a new way of fundraising materialized known \nas airdrops.\
                \n\n\Airdrops were not a feasible fundraising method up until the launch of EOS, because \non other foundation networks at the time, like Ethereum, transactions costs made \nairdrops ineffective and costly, so they were mostly done as a way to market a \nproduct and raise awareness.\
                \n\nLearn more by visiting Telos Central's category on Airdrops, or visit Acons.fun for a \nstep by step walkthrough and tutorials.";

                this.question = "Which of the following are Telos airdrops?";
                this.answers = [];
                this.answers.push("EDNA.");
                this.answers.push("eZAR.");
                this.answers.push("SQRL.");
                this.answers.push("All of the above. ");
                
                // Link Info Buttons. CreateButton(x, y, btnWidth, textInfo, link)
                // Empty the array
                this.linkButtons = [];
                
                // Set the textsize before calculating the textWidth
                textSize(this.textS);
                var linkButton1Text = "Acorns.fun"
                var linkButton1TextWidth = textWidth(linkButton1Text);
                this.linkButtons.push(new CreateButton(this.x + 30, this.y + this.H - 70, linkButton1TextWidth+10, linkButton1Text, this.textS, "https://www.acorns.fun/level-3-add-the-acorns-token-to-your-wallet/"));
                
                var linkButton2Text = "Telos Central"
                var linkButton2TextWidth = textWidth(linkButton2Text);
                this.linkButtons.push(new CreateButton(this.x + 30 + linkButton1TextWidth + 40, this.y + this.H - 70, linkButton2TextWidth+10, linkButton2Text, this.textS, "https://teloscentral.com/"));
                
                // Question buttons.
                // Empty the array
                this.questionButtons = [];
                for(var i = 0; i < this.answers.length; i++){
                    var buttonY = this.y + this.H*2/10 + 75*i;
                    this.questionButtons.push(new CreateButton(this.x+25, buttonY, this.W-60, this.answers[i]));
                }
            }
            
            // Level 11 one questions and answers - Dapps
            else if(levelNum == 11){
                this.heading = "The Telos Blockchain - Dapps.";
                this.message = "Dapps have been mentioned now a couple of times, short for Decentralized Applications. \nAn application is basically any program that runs on top of an operating system, such as \nExcel or Word that runs on Windows. In a way, Telos can be compared to Windows as the \noperating system and developers can then build applications that run on these operating \nsystems, whether it's games, accounting software or media applications that play \nmusic or videos.\
                \n\nThere might be many reasons why you would want to develop on a platform like Telos, \nbut the main benefits are that you have a built-in currency with free transactions that are \naccepted worldwide. Secondly, your application would be resistant to censorship and \nany other forms of government intervention and thirdly, your application would be running \non a network that is redundant many times over with servers worldwide, so no downtime, \never.\
                \n\nYou can explore all the Dapps currently running on Telos, as well as those currently \nunder development by visiting either Explore.Telos.net or the Live Dapps category at \nTelos Central.com. The links to both sources are below.";

                this.question = "Which one of the following is a Dapp running on Telos?";
                this.answers = [];
                this.answers.push("Crypto Kitties.");
                this.answers.push("WordProof.io. ");
                this.answers.push("EOS Dynasty.");
                this.answers.push("All of the above.");
                
                // Link Info Buttons. CreateButton(x, y, btnWidth, textInfo, link)
                // Empty the array
                this.linkButtons = [];
                
                // Set the textsize before calculating the textWidth
                textSize(this.textS);
                var linkButton1Text = "Telos.net"
                var linkButton1TextWidth = textWidth(linkButton1Text);
                this.linkButtons.push(new CreateButton(this.x + 30, this.y + this.H - 70, linkButton1TextWidth+10, linkButton1Text, this.textS, "https://explore.telos.net/"));
                
                var linkButton2Text = "Telos Central"
                var linkButton2TextWidth = textWidth(linkButton2Text);
                this.linkButtons.push(new CreateButton(this.x + 30 + linkButton1TextWidth + 40, this.y + this.H - 70, linkButton2TextWidth+10, linkButton2Text, this.textS, "https://teloscentral.com/"));
                
                // Question buttons.
                // Empty the array
                this.questionButtons = [];
                for(var i = 0; i < this.answers.length; i++){
                    var buttonY = this.y + this.H*2/10 + 75*i;
                    this.questionButtons.push(new CreateButton(this.x+25, buttonY, this.W-60, this.answers[i]));
                }
            }
            
            // Level 12 one questions and answers - Getting Involved
            else if(levelNum == 12){
                this.heading = "The Telos Blockchain - Getting Involved.";
                this.message = "There's a lot more to be discovered about Telos and I'm sure you'll learn more and more \nevery day as you get involved. The Telos community is one with a great culture and a \nwillingness to help fellow community members. \
                \n\nMake sure you join the social media channels and chat groups below to get involved. \
                \n\nThank you for playing Matsuo and thank you for your interest in Telos. \
                \n\nDeveloped by Telos Central with love and a passion for the Telos blockchain.\
                \n\nWe would love to get some feedback from you regarding improvements we can make \nto either our portal, or the game itself, so please join our telegram group and get in touch.";

                this.question = "Congratulations, you've completed all 12 levels of Matsuo. \
                \n\nThere are plans to continue development on this game, \nso stay connected for updates. \
                \n\nPress enter to return to the start page.";
                
                // Empty the array
                this.answers = [];
                
                // Link Info Buttons. CreateButton(x, y, btnWidth, textInfo, link)
                // Empty the array
                this.linkButtons = [];
                
                // Question buttons.
                // Empty the array
                this.questionButtons = [];
            }

        }
        
        this.mouseClicked = function(){
            if(this.displayWin){
                
                // Check the linkbuttons for mouse click
                for(var i = 0; i < this.linkButtons.length; i++){
                    this.linkButtons[i].press();
                }
                
                // Check the continue button for mouse click
                this.continueButton.press();
                
                // Check the question buttons for mouse click
                for(var i = 0; i < this.questionButtons.length; i++){
                    // Clear the other buttons so only one is selected at a time
                    //if(this.questionButtons[i].isPressed == true){this.questionButtons[i].isPressed = false}
                    this.questionButtons[i].press(i, this.questionButtons);
                }
            }
            
        }
        
}
//-----------------------------------------------------------------------------------
//End of the Function to the Telos Info
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
//Function to pull throught the message to be displayed.
//-----------------------------------------------------------------------------------
function callInfo(qOrA, num){
    // Set the text properties
    noStroke();

    // Information Text
    var textX = infoDisplayObj.x+10;
    var textY = infoDisplayObj.y+10;
    
    var textH = (sqrt(width*height)*0.022)/gameScale;
    var textP = (sqrt(width*height)*0.020)/gameScale;
    
    // Answer - Information
    if(qOrA == "A"){
        var arrayH = infoDisplayObj.heading;
        var arrayM = infoDisplayObj.message;
        
        // Level 1 message.
        textAlign(LEFT, TOP);
        
        // Message
        textSize(textP);
        fill(darkText);
        text(arrayM, textX, textY+50);

    }
    else if(qOrA == "Q"){
        var arrayH = infoDisplayObj.question;
        var arrayM = infoDisplayObj.answers[0];
        
    }
    
    // Level 1 message.
    textAlign(LEFT, TOP);
        
    // Heading
    textSize(textH);
    fill(orangeText);
    text(arrayH, textX, textY);
    
}
//-----------------------------------------------------------------------------------
//End of the Function to pull throught the message to be displayed.
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
//Function to display the info sign
//-----------------------------------------------------------------------------------
function createInfo(){
    infoObj = {
        x: 0,
        y: 0,
        size: 0.3,
        time: 1,
        set: false,
        reset: true,
        isFound: false,
        platNum: 0,

        //Setup function.
        setup: function(){
            this.platNum = int(random(0, platforms.length));
            this.x = platforms[this.platNum].x + platforms[this.platNum].width/2;
            this.y = platforms[this.platNum].y;
            this.size = 0.3;
        },
        
        draw: function(){
            if(!this.isFound){
                // Increase and decrease the size of the sign to attract attention.
                var interV = int(frameCount/30%2);
                if(interV == 1 && this.set == false)
                {
                    this.time += 1;
                    this.set = true;
                    this.reset = false;
                }
                else if(interV == 0 && this.reset == false)
                {
                    this.set = false;
                    this.reset = true;
                }
                if(this.time == 7){
                    this.time = 1;
                }
                if(this.time <= 3){
                    this.size += 0.0005;
                }else if(this.time > 3){
                    this.size -= 0.0005;
                }
                
                //Move the Info Sign along platform.
                this.y = platforms[this.platNum].y;
                this.x = platforms[this.platNum].x + platforms[this.platNum].width/2;

                // Draw the Info Sign.
                fill(255, 224, 43);
                quad(this.x -30*this.size, this.y - 150*this.size,
                     this.x + 30*this.size, this.y - 150*this.size,
                     this.x + 15*this.size, this.y + 0*this.size,
                     this.x - 15*this.size, this.y + 0*this.size
                    );
                ellipse(this.x + 0*this.size, this.y-190*this.size, 60*this.size);
            }
            
            this.found();
        },
        
        found: function()
        {
            // Check if found
            var infoDist = dist(this.x, this.y, gameChar_world_x, squirrelObj.y);
            if(!this.isFound && infoDist < 30)
            {
                infoDisplayObj.displayWin = true;
                this.isFound = true;
            }
        }
    
    }
    return infoObj;
}
//-----------------------------------------------------------------------------------
//Function to display the info sign
//-----------------------------------------------------------------------------------
