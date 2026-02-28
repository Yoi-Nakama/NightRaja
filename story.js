/**
 * Night Raja - Story Data
 * Contains all scenes, dialogues, and narrative branches
 */

const storyData = {
    scenes: {
        // Introduction scene
        'intro_start': {
            background: 'assets/backgrounds/earth-dark.jpg',
            character: null,
            speaker: 'Narrator',
            text: 'You awaken to the sound of wind howling through an abandoned alley. Your senses are sharp—sharper than any human\'s could be. You remember... you are a vampire. But everything else is fragmented, like broken glass scattered across your mind.\n\nYou remember arriving on Earth. But why? And what happened to your memories?\n\nYou emerge from the shadows. The eternal darkness has taken hold of this world. As you step into the street, you see the first sign of humanity\'s corruption.\n\nA group of people arguing violently. Their eyes seem... different. Like there\'s something stirring beneath their skin.',
            choices: [
                {
                    text: 'Approach them peacefully and try to understand their conflict',
                    karma: 15,
                    northStar: 10,
                    nextScene: 'encounter_group_peaceful',
                },
                {
                    text: 'Watch from the shadows and gather information',
                    karma: 0,
                    nextScene: 'encounter_group_observe',
                },
                {
                    text: 'Use your presence to intimidate them into submission',
                    karma: -20,
                    sunGod: 10,
                    nextScene: 'encounter_group_intimidate',
                },
            ],
        },

        // Peaceful approach
        'encounter_group_peaceful': {
            background: 'assets/backgrounds/street-night.jpg',
            character: 'assets/characters/human-group.png',
            speaker: 'Stranger',
            text: 'You calmly walk toward them, hands raised in a peaceful gesture. The group tenses, but doesn\'t immediately attack.\n\n"Please," you say softly. "I mean no harm. What troubles you?"\n\nOne of them, a woman with haunted eyes, steps forward. She seems to be on the verge of losing control—her whole body trembling.\n\n"The Madness," she whispers. "It\'s getting stronger. Every day, the urge to hurt someone grows. I can feel it clawing at my mind."',
            choices: [
                {
                    text: 'Offer to help her understand this curse',
                    karma: 20,
                    northStar: 15,
                    unlocksAbility: 'Compassion\'s Path',
                    nextScene: 'help_woman_understand',
                },
                {
                    text: 'Ask if she\'s been particularly sinful',
                    karma: -10,
                    nextScene: 'judge_woman',
                },
                {
                    text: 'Feed on her fear and essence',
                    karma: -30,
                    sunGod: 20,
                    nextScene: 'feed_on_group',
                },
            ],
        },

        // Observation scene
        'encounter_group_observe': {
            background: 'assets/backgrounds/street-night.jpg',
            character: null,
            speaker: 'Narrator',
            text: 'From the shadows, you watch carefully. The group devolves into violence—their eyes glow with an eerie red light. The Madness of Sin, awakening in their minds.\n\nOne of them collapses, seemingly immune to the wounds inflicted. They continue to move, to fight, even as blood pools around them.\n\nYou realize the truth the North Star\'s guidance whispered to you: The most corrupt among them cannot die by violence. They are trapped in immortal pain.\n\nAs the violence spreads, you must decide: Will you intervene?',
            choices: [
                {
                    text: 'Stop the violence and protect the innocent',
                    karma: 25,
                    northStar: 20,
                    nextScene: 'stop_violence',
                },
                {
                    text: 'Let natural selection take its course',
                    karma: -5,
                    nextScene: 'let_it_happen',
                },
                {
                    text: 'Feed on the chaos and dark energy',
                    karma: -25,
                    sunGod: 15,
                    nextScene: 'feed_on_chaos',
                },
            ],
        },

        // Intimidation scene
        'encounter_group_intimidate': {
            background: 'assets/backgrounds/street-night.jpg',
            character: 'assets/characters/vampire-form.png',
            speaker: 'Narrator',
            text: 'Your eyes glow with otherworldly crimson light. The temperature drops. The group freezes, sensing something ancient and terrible before them.\n\nOne by one, they flee in terror. The strongest among them remains, too lost in the Madness to feel proper fear.\n\n"What... what are you?" he gasps, eyes filled with the red glow of sin-touched madness.\n\nYou can feel his corruption, his centuries of sin clinging to his broken soul. He is one of the immortals—the ones the Sun God cursed to endless life.',
            choices: [
                {
                    text: 'Put him out of his misery',
                    karma: 5,
                    northStar: 5,
                    nextScene: 'merciful_end',
                },
                {
                    text: 'Feed on him and gain strength',
                    karma: -40,
                    sunGod: 25,
                    unlocksAbility: 'Blood Drain',
                    nextScene: 'feed_and_gain_power',
                },
                {
                    text: 'Question him about this world\'s fate',
                    karma: 0,
                    nextScene: 'interrogate_human',
                },
            ],
        },

        // Help woman understand
        'help_woman_understand': {
            background: 'assets/backgrounds/safe-shelter.jpg',
            character: 'assets/characters/woman-grateful.png',
            speaker: 'Woman',
            text: 'She looks at you with a mixture of fear and hope.\n\n"The Madness... it\'s the price of sin," you explain gently. "Each wrong deed, each cruelty—it feeds the darkness within. But there is a path. If you choose compassion, if you choose to atone and help others, the Madness loses its grip."\n\nShe nods slowly, and you can see the light returning to her eyes.\n\n"Thank you. There are others like me. If you can show them the way..."\n\nYou\'ve made your first true connection with humanity.',
            choices: [
                {
                    text: 'Agree to help others find redemption',
                    karma: 30,
                    northStar: 25,
                    unlocksAbility: 'Redemption\'s Touch',
                    nextScene: 'act1_ending_good',
                },
                {
                    text: 'Promise to help, but with hidden motives',
                    karma: 5,
                    nextScene: 'act1_ending_neutral',
                },
            ],
        },

        // Feed on group
        'feed_on_group': {
            background: 'assets/backgrounds/street-dark.jpg',
            character: 'assets/characters/vampire-bloody.png',
            speaker: 'Narrator',
            text: 'Your hunger overtakes you. You move with inhuman speed, and the fear of the group becomes a feast. You drain them of their essence, leaving hollow shells behind.\n\nYour power surges. For a moment, you feel the memory of your true strength—the power that once made civilizations tremble.\n\nBut the Sun God\'s presence grows darker, more oppressive. His judgment weighs upon you.\n\nYou have demonstrated your threat to humanity. The question now is: Will he destroy you, or test you further?',
            choices: [
                {
                    text: 'Seek more power to resist the Sun God\'s judgment',
                    karma: -50,
                    sunGod: 30,
                    unlocksAbility: 'Blood Hunger',
                    nextScene: 'act1_ending_dark',
                },
                {
                    text: 'Resist the hunger and seek redemption',
                    karma: 20,
                    northStar: 15,
                    nextScene: 'act1_ending_redemption_attempt',
                },
            ],
        },

        // Act 1 ending - Good path
        'act1_ending_good': {
            background: 'assets/backgrounds/dawn-breaking.jpg',
            character: null,
            speaker: 'Narrator',
            text: 'Days pass. Word spreads of a mysterious being who helps the afflicted. More people come seeking guidance.\n\nYour power grows not from feeding, but from the gratitude and hope you inspire. The North Star\'s light seems to shine brighter through you.\n\nYet the Sun God watches, waiting to see if this mercy is genuine or merely a deception.\n\nAct 1 Complete: The Path of Compassion\n\nCurrent Karma: ' + 'CALCULATE' + '\nNext: Act 2 - Rising Hope',
            choices: [
                {
                    text: 'Continue to Act 2',
                    nextScene: 'act2_start',
                },
            ],
        },

        // Act 1 ending - Neutral path
        'act1_ending_neutral': {
            background: 'assets/backgrounds/twilight-city.jpg',
            character: null,
            speaker: 'Narrator',
            text: 'You help those who seek you out, but remain detached from the world\'s greater struggles. Neither the North Star nor the Sun God can determine your true nature.\n\nPerhaps you are truly the neutral observer this world needs. Or perhaps you are merely hiding your true intentions.\n\nAct 1 Complete: The Watcher\'s Path\n\nCurrent Karma: CALCULATE\nNext: Act 2 - The Spreading Darkness',
            choices: [
                {
                    text: 'Continue to Act 2',
                    nextScene: 'act2_start',
                },
            ],
        },

        // Act 1 ending - Dark path
        'act1_ending_dark': {
            background: 'assets/backgrounds/blood-moon.jpg',
            character: 'assets/characters/vampire-transformed.png',
            speaker: 'Narrator',
            text: 'You have tasted true power once more. The hunger inside you is insatiable. Each night, more victims. Each day, your abilities expand.\n\nHumanity begins to fear you. Some call you a demon, a punishment sent by the Sun God himself.\n\nBut the North Star\'s presence has grown cold. Distant. The being who sent you watches now with something close to regret.\n\nAct 1 Complete: The Devourer\'s Path\n\nCurrent Karma: CALCULATE\nNext: Act 2 - Humanity\'s Enemy',
            choices: [
                {
                    text: 'Continue to Act 2',
                    nextScene: 'act2_start',
                },
            ],
        },

        // Act 1 ending - Redemption attempt
        'act1_ending_redemption_attempt': {
            background: 'assets/backgrounds/sacred-night.jpg',
            character: null,
            speaker: 'Narrator',
            text: 'You have tasted what it means to destroy, but you turn away from it. The hunger remains, but you choose to control it.\n\nYour struggle becomes known. Some see you as a monster trying to change. Others see you as hope.\n\nNeither god speaks, but you feel the North Star\'s cautious approval and the Sun God\'s cruel amusement at your internal conflict.\n\nAct 1 Complete: The Redeemed Demon\'s Path\n\nCurrent Karma: CALCULATE\nNext: Act 2 - Redemption\'s Trial',
            choices: [
                {
                    text: 'Continue to Act 2',
                    nextScene: 'act2_start',
                },
            ],
        },

        // Act 2 Start
        'act2_start': {
            background: 'assets/backgrounds/city-burning.jpg',
            character: null,
            speaker: 'Narrator',
            text: 'Weeks have passed since your arrival on Earth. The world has begun to change around you.\n\nMore and more humans succumb to the Madness. Pockets of civilization collapse. The immortal cursed ones begin to organize, creating factions and cults.\n\nAnd you... you grow stronger each day.\n\nA new figure has emerged in the shadows. Someone else who seems aware of the true nature of this world. They seek you out.\n\n"I\'ve been looking for you," they say, stepping from the darkness. "The gods\' game is about to escalate. And we both have a role to play."',
            choices: [
                {
                    text: 'Listen to what this stranger has to say',
                    karma: 0,
                    nextScene: 'act2_stranger_dialogue',
                },
                {
                    text: 'Attack first, ask questions later',
                    karma: -15,
                    nextScene: 'act2_attack_stranger',
                },
                {
                    text: 'Demand to know their identity and purpose',
                    karma: 5,
                    nextScene: 'act2_interrogate_stranger',
                },
            ],
        },
    },
};
