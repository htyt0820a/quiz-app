const questions = [
  {
    text: '日本で最も長い川はどれでしょう？',
    choices: ['利根川', '信濃川', '石狩川', '木曽川'],
    correct: 1,
    explanation: '信濃川は全長約367kmで、日本で最も長い川です。長野県から新潟県を流れます。'
  },
  {
    text: '元素記号「Au」が表す元素は何でしょう？',
    choices: ['銀', '銅', '金', 'アルミニウム'],
    correct: 2,
    explanation: '「Au」はラテン語の「Aurum（黄金）」に由来する金（きん）の元素記号です。'
  },
  {
    text: '世界三大料理に含まれないものはどれでしょう？',
    choices: ['フランス料理', '中国料理', 'トルコ料理', 'イタリア料理'],
    correct: 3,
    explanation: '世界三大料理は、フランス料理・中国料理・トルコ料理とされています。イタリア料理は含まれません。'
  },
  {
    text: '太陽系で最も大きな惑星はどれでしょう？',
    choices: ['土星', '天王星', '海王星', '木星'],
    correct: 3,
    explanation: '木星は直径が地球の約11倍あり、太陽系の惑星の中で最も大きな惑星です。'
  },
  {
    text: '「吾輩は猫である」の作者は誰でしょう？',
    choices: ['芥川龍之介', '夏目漱石', '森鴎外', '太宰治'],
    correct: 1,
    explanation: '「吾輩は猫である」は夏目漱石の作品で、1905年に発表されたデビュー小説です。'
  },
  {
    text: '富士山の標高として正しいものはどれでしょう？',
    choices: ['3,376m', '3,576m', '3,776m', '3,976m'],
    correct: 2,
    explanation: '富士山の標高は3,776mで、日本で最も高い山です。静岡県と山梨県にまたがります。'
  },
  {
    text: '「モナ・リザ」を描いた芸術家は誰でしょう？',
    choices: ['ミケランジェロ', 'ラファエロ', 'ボッティチェリ', 'レオナルド・ダ・ヴィンチ'],
    correct: 3,
    explanation: '「モナ・リザ」はレオナルド・ダ・ヴィンチが16世紀初頭に描いた作品で、現在はパリのルーヴル美術館に所蔵されています。'
  },
  {
    text: '日本の国技はどれでしょう？',
    choices: ['柔道', '剣道', '相撲', '空手'],
    correct: 2,
    explanation: '相撲は日本の国技とされており、その歴史は1500年以上にわたります。日本相撲協会が管轄しています。'
  },
  {
    text: 'オリンピックの五輪マークに使われていない色はどれでしょう？',
    choices: ['赤', '緑', '紫', '黄'],
    correct: 2,
    explanation: 'オリンピックの五輪の色は青・黄・黒・緑・赤の5色です。紫は含まれていません。'
  },
  {
    text: '人体で最も大きな臓器はどれでしょう？',
    choices: ['肺', '肝臓', '心臓', '皮膚'],
    correct: 3,
    explanation: '皮膚は人体最大の臓器で、成人では面積約1.6〜1.8㎡、重さ約3〜4kgにもなります。'
  }
];

let currentIndex = 0;
let score = 0;
let answered = false;

const startScreen = document.getElementById('start-screen');
const quizScreen  = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const questionText  = document.getElementById('question-text');
const choicesEl     = document.getElementById('choices');
const feedbackEl    = document.getElementById('feedback');
const feedbackText  = document.getElementById('feedback-text');
const feedbackExp   = document.getElementById('feedback-explanation');
const nextBtn       = document.getElementById('next-btn');
const currentNumEl  = document.getElementById('current-num');
const progressBar   = document.getElementById('progress-bar');
const finalScore    = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');

document.getElementById('start-btn').addEventListener('click', startQuiz);
nextBtn.addEventListener('click', goNext);
document.getElementById('retry-btn').addEventListener('click', resetQuiz);

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

function startQuiz() {
  currentIndex = 0;
  score = 0;
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  const q = questions[currentIndex];

  currentNumEl.textContent = currentIndex + 1;
  progressBar.style.width = `${(currentIndex / questions.length) * 100}%`;
  questionText.textContent = q.text;

  feedbackEl.className = 'feedback hidden';
  feedbackText.textContent = '';
  feedbackExp.textContent = '';
  nextBtn.classList.add('hidden');

  choicesEl.innerHTML = '';
  q.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => selectAnswer(i));
    choicesEl.appendChild(btn);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const buttons = choicesEl.querySelectorAll('.choice-btn');

  buttons.forEach(btn => btn.disabled = true);

  if (selectedIndex === q.correct) {
    score++;
    buttons[selectedIndex].classList.add('correct');
    feedbackEl.className = 'feedback correct';
    feedbackText.textContent = '正解！';
  } else {
    buttons[selectedIndex].classList.add('incorrect');
    buttons[q.correct].classList.add('correct');
    feedbackEl.className = 'feedback incorrect';
    feedbackText.textContent = '不正解...';
  }

  feedbackExp.textContent = q.explanation;

  const isLast = currentIndex === questions.length - 1;
  nextBtn.textContent = isLast ? '結果を見る' : '次の問題へ';
  nextBtn.classList.remove('hidden');
}

function goNext() {
  currentIndex++;
  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  progressBar.style.width = '100%';
  finalScore.textContent = score;
  resultMessage.textContent = getResultMessage(score);
  showScreen(resultScreen);
}

function getResultMessage(s) {
  if (s === 10) return '完璧です！素晴らしい知識をお持ちですね！';
  if (s >= 8)  return 'とても優秀です！あと少しで満点！';
  if (s >= 6)  return '合格ライン突破！もう一度挑戦してみよう！';
  if (s >= 4)  return 'まだまだ伸びしろがあります。再挑戦してみよう！';
  return 'もっと勉強して、再挑戦してみましょう！';
}

function resetQuiz() {
  startQuiz();
}
