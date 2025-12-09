document.addEventListener('DOMContentLoaded', () => {
    // State
    const questions = [
        {
            text: "What does FHE stand for?",
            options: [
                "Fully Homomorphic Encryption",
                "Fast Hash Encoding",
                "Full Hardware Encryption",
                "Federated Homomorphic Engine"
            ],
            correctIndex: 0
        },
        {
            text: "What is Zama?",
            options: [
                "A company building open-source tools for Fully Homomorphic Encryption",
                "A decentralized exchange on Solana",
                "A layer-2 scaling solution for Ethereum",
                "An NFT marketplace"
            ],
            correctIndex: 0
        },/*
        {
            text: "Which operation can be done using FHE?",
            options: [
                "Computations on encrypted data",
                "Decryption without a key",
                "Generating zero-knowledge proofs",
                "Breaking RSA encryption"
            ],
            correctIndex: 0
        },
        {
            text: "Does FHE allow data to remain private during computation or only at rest?",
            options: [
                "During computation",
                "Only at rest",
                "Only during transmission",
                "Never, it must be decrypted first"
            ],
            correctIndex: 0
        },
        {
            text: "What does the “noise” term in FHE represent?",
            options: [
                "A random component added to ensure encryption security",
                "The error in the blockchains timestamp",
                "The randomness of wallet addresses",
                "The failure rate in decryption"
            ],
            correctIndex: 0
        },
        {
            text: "Is FHE symmetric or asymmetric encryption?",
            options: [
                "Asymmetric",
                "Symmetric",
                "Both",
                "Neither"
            ],
            correctIndex: 0
        },
        {
            text: "What’s the purpose of Concrete ML?",
            options: [
                "To run AI/ML models directly on encrypted data using FHE",
                "To compress encrypted datasets",
                "To mine confidential transactions",
                "To generate synthetic FHE noise"
            ],
            correctIndex: 0
        },
        {
            text: "What is HTTPZ?",
            options: [
                "An FHE-based privacy layer for web apps developed by Zama",
                "A blockchain explorer",
                "A decentralized VPN",
                "A ZK rollup protocol"
            ],
            correctIndex: 0
        },
        {
            text: "What is Orion Finance?",
            options: [
                "Confidential vaults for DeFi portfolio management using FHE",
                "A staking protocol for AI models",
                "A privacy-focused NFT platform",
                "A Bitcoin bridge for EVM chains"
            ],
            correctIndex: 0
        },
        {
            text: "Using Zaïffer Protocol you can create __?",
            options: [
                "Your own FHE token",
                "Private smart contracts",
                "Encrypted NFTs",
                "Zero-knowledge proofs"
            ],
            correctIndex: 0
        },
        {
            text: "Name a project that can help you to create private vesting and airdrops",
            options: [
                "TokenOps",
                "Zaïffer",
                "Privasea",
                "Conduit"
            ],
            correctIndex: 0
        },
        {
            text: "Galactica is__?",
            options: [
                "A private on-chain identity system",
                "An FHE-based lending protocol",
                "A confidential AI model hub",
                "A DeFi aggregator"
            ],
            correctIndex: 0
        },
        {
            text: "Which project raised the most ? (Fhenix, Obol, Privasea or Redact)",
            options: [
                "Fhenix",
                "Obol",
                "Privasea",
                "Redact"
            ],
            correctIndex: 0
        },
        {
            text: "What is Raycash?",
            options: [
                "A private and trustless banking platform",
                "A decentralized identity project",
                "An encrypted gaming ecosystem",
                "A cross-chain bridge"
            ],
            correctIndex: 0
        },
        {
            text: "Zama's contracts has been audited by __?",
            options: [
                "OpenZeppelin",
                "Certik",
                "Trail of Bits",
                "Quantstamp"
            ],
            correctIndex: 0
        },
        {
            text: "Which one is NOT a Zama Protocol Operator? (Ledger, InfStones, LayerZero, Conduit)",
            options: [
                "Conduit",
                "Ledger",
                "InfStones",
                "LayerZero"
            ],
            correctIndex: 0
        },
        {
            text: "Which chain Zama will NOT be deployed on during 2026? (Ethereum, Base, HEVM, Solana)",
            options: [
                "HEVM",
                "Ethereum",
                "Base",
                "Solana"
            ],
            correctIndex: 0
        }*/
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    // DOM Elements
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');

    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const shareBtn = document.getElementById('share-btn');

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const progressBar = document.getElementById('progress-bar');
    const questionCount = document.getElementById('question-count');

    const finalScore = document.getElementById('final-score');
    const totalScore = document.getElementById('total-score');
    const resultMessage = document.getElementById('result-message');

    // Event Listeners
    startBtn.addEventListener('click', startQuiz);
    restartBtn.addEventListener('click', restartQuiz);
    if (shareBtn) shareBtn.addEventListener('click', shareResult);

    function shareResult() {
        const text = `I just scored ${score}/${questions.length} on the @ZamaOnly Quiz! Can you beat my score? 🧠🔒 #FHE #Zama https://x.com/ZamaOnly/status/1996758350143410382`;
        const url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
        window.open(url, '_blank');
    }

    function startQuiz() {
        showScreen(quizScreen);
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    }

    function loadQuestion() {
        const question = questions[currentQuestionIndex];

        // Update UI
        questionText.textContent = question.text;
        questionCount.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;

        // Update Progress Bar
        const progress = ((currentQuestionIndex) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;

        // Create an array of options with their original indices
        const optionsWithIndex = question.options.map((opt, i) => ({
            text: opt,
            originalIndex: i
        }));

        // Shuffle options
        optionsWithIndex.sort(() => Math.random() - 0.5);

        // Find the new index of the correct answer
        const correctDomIndex = optionsWithIndex.findIndex(opt => opt.originalIndex === question.correctIndex);

        // Render Options
        optionsContainer.innerHTML = '';
        optionsWithIndex.forEach((opt, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = opt.text;
            button.addEventListener('click', () => selectAnswer(index, correctDomIndex));
            optionsContainer.appendChild(button);
        });
    }

    function selectAnswer(selectedIndex, correctIndex) {
        const buttons = optionsContainer.querySelectorAll('.option-btn');

        // Disable all buttons to prevent double clicking
        buttons.forEach(btn => btn.disabled = true);

        // Highlight selected and correct answers
        if (selectedIndex === correctIndex) {
            buttons[selectedIndex].classList.add('correct');
            score++;
            createParticles(buttons[selectedIndex]);
        } else {
            buttons[selectedIndex].classList.add('wrong');
            buttons[correctIndex].classList.add('correct');
        }

        // Delay before next question
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                // Update progress before loading next
                const progress = (currentQuestionIndex / questions.length) * 100;
                progressBar.style.width = `${progress}%`;
                loadQuestion();
            } else {
                endQuiz();
            }
        }, 600);
    }

    function createParticles(element, count = 30, spread = 200) {
        let centerX, centerY;

        if (element) {
            const rect = element.getBoundingClientRect();
            centerX = rect.left + rect.width / 2;
            centerY = rect.top + rect.height / 2;
        } else {
            // Random localized burst logic
            // Pick a random point within the visible screen (with padding)
            centerX = Math.random() * (window.innerWidth - 100) + 50;
            centerY = Math.random() * (window.innerHeight - 100) + 50;
        }

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('confetti');
            document.body.appendChild(particle);

            // Origin is always the center of the burst
            const x = centerX;
            const y = centerY;

            // Random destination spread
            const tx = (Math.random() - 0.5) * spread;
            const ty = (Math.random() - 0.5) * spread;

            // Random colors (Yellow, White, Black theme)
            const colors = ['#FFE600', '#FFFFFF', '#f3c600ff'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);

            // Animation
            const duration = 0.8 + Math.random() * 1.5;
            particle.style.animation = `confetti-fall ${duration}s ease-out forwards`;

            // Cleanup matches user preference
            setTimeout(() => {
                particle.remove();
            }, duration * 700);
        }
    }

    function endQuiz() {
        showScreen(resultScreen);
        finalScore.textContent = score;
        document.querySelector('.total-score').textContent = `/ ${questions.length}`;

        // Custom message based on score
        if (score === questions.length) {
            resultMessage.textContent = "You are a genius... or just weird.";
        } else if (score >= questions.length * 0.75) {
            resultMessage.textContent = "Not bad for a rookie.";
        } else if (score >= questions.length * 0.45) {
            resultMessage.textContent = "You can do better";
        } else if (score >= questions.length * 0.25) {
            resultMessage.textContent = "Your brain is encyphered";
        } else {
            resultMessage.textContent = "💀";
        }

        // Trigger massive celebration loop
        let bursts = 0;
        const scoreRatio = score / questions.length;
        const maxBursts = Math.round(scoreRatio * 24);

        // Dynamic size calculation
        // Min: 10 particles, 100px spread
        // Max: 50 particles, 350px spread
        const dynamicCount = 5 + Math.round(scoreRatio * 40);
        const dynamicSpread = 20 + Math.round(scoreRatio * 250);

        if (maxBursts > 0) {
            const interval = setInterval(() => {
                createParticles(null, dynamicCount, dynamicSpread); // Creates a random localized burst with dynamic size
                bursts++;
                if (bursts >= maxBursts) clearInterval(interval);
            }, 300);
        }
    }

    function restartQuiz() {
        showScreen(startScreen);
    }

    function showScreen(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        // Small delay to allow fade out if we were doing transitions, 
        // but for simplicity we just switch active class
        screen.classList.add('active');
        screen.classList.add('fade-in-up'); // Re-trigger animation
    }
});
