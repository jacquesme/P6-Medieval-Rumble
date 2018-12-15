'use strict';

/*Quiz*/

var Question = function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;

    this.displayQuestion = function () {
        $('.question').text(this.question);

        for (var i = 0; i < this.answers.length; i++) {
            $('form').append('<input type="radio" id="answer" name="ans" value="' + i + '">' + this.answers[i] + '<br>');
        }
    };

    this.checkAnswer = function (n) {
        $('input[type="radio"]').change(function () {
            var checked = $(this).is(':checked');
            if (checked) {
                var thisChecked = $(this).val();
                var playerChoice = parseInt(thisChecked);
                if (playerChoice == questions[n].correct) {
                    $('.result').text('This is the right answer, you earn 15 points!');
                    scores += 15;
                    $('form').empty();
                    $('.question').empty();
                } else {
                    $('.result').text('Wrong answer... You loose 10 points!');
                    scores -= 10;
                    $('form').empty();
                    $('.question').empty();
                }
            }
        });
    };
};
var q1 = new Question('Which 12th-century historian wrote the first detailed account of King Arthur?', ['Geoffrey of Monmouth', 'Gildas', 'William of Newburgh'], 1);
var q2 = new Question("What proportion of the English population is estimated to have been killed by the Black Death in 1348-9?", ['One Tenth', 'Three Qaurters', 'One Fifth'], 2);
var q3 = new Question("Which 15th-century Norfolk family left behind a large letter collection that tells us much about the lives of the gentry in the period?", ['The Becketts', 'The Godfreys', 'The Pastons'], 2);
var q4 = new Question('Only one of the following was an essential part of the marriage ceremony in the Middle Ages. Which one?', ['Exchange of words of consent by the couple', 'Exchange of rings', 'Blessing by a priest'], 0);
var q5 = new Question("Where did the popes spend much of the 14th century?", ['Avignon', 'Rome', 'Naples'], 0);
var q6 = new Question('Which English king rebuilt Westminster Abbey in the 13th century?', ['Henry III', 'Edward the Confessor', 'John'], 0);
var q7 = new Question('Which was the last country in Europe to convert officially to Christianity, in 1387?', ['Iceland', 'Lithuania', 'Estonia'], 1);

var questions = [q1, q2, q3, q4, q5, q6, q7];

function initQuiz() {
    // Weapon.js (93)
    scores = 0;
    $('.container-quiz').show();
    var n = random(questions.length);
    questions[n].displayQuestion();
    questions[n].checkAnswer(n);
}
function closeQuiz() {
    addExtraPoints();
    $('.container-quiz').hide();
    $('form').empty();
    $('.result').empty();
}