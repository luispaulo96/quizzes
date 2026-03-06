import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Layout from '../components/Layout';
import Menubar from '../components/Menubar';

function Quiz() {
  const navigate = useNavigate();

  const [expPoints, setExpPoints] = useState(0);
  const [expColor, setExpColor] = useState('secondary');
  const [questionCount, setQuestionCount] = useState(0);
  const [currrentQuiz, setCurrentQuiz] = useState<any>({ questions: [{ answers: [] }] });
  const [lastAnswerClicked, setLastAnswerClicked] = useState(0);
  const [theAnswer, setTheAnswer] = useState(-1);
  const [qtyRight, setQtyRight] = useState(0);
  const [qtyWrong, setQtyWrong] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [disableOptions, setDisableOptions] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [showOverall, setShowOverall] = useState(false);

  const quizId = useParams().id;

  const sendAnswer = async (ev: React.MouseEvent, answerId: number) => {
    setLastAnswerClicked(answerId);
    setDisableOptions(true);

    const accessToken = localStorage.getItem('access-token');
    const currentQuestionId = currrentQuiz.questions[questionCount].pk_question;

    const resultResponse = await fetch(`${process.env.REACT_APP_API_URL}/questions/${currentQuestionId}/answer/${answerId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const resultResponseJson = await resultResponse.json();
    setIsAnswerCorrect(resultResponseJson.isAnswerCorrect);
    setExpPoints(resultResponseJson.newExpPoints);
    setTheAnswer(resultResponseJson.theAnswer);
    if (resultResponseJson.newExpPoints > 0) {
      setExpColor('success');
    } else if (resultResponseJson.newExpPoints < 0) {
      setExpColor('danger');
    } else {
      setExpColor('secondary');
    }

    if (resultResponseJson.isAnswerCorrect) {
      setQtyRight((prev) => prev + 1);
    } else {
      setQtyWrong((prev) => prev + 1);
    }

    setShowResult(true);
    setIsQuizFinished(questionCount + 1 >= currrentQuiz.questions.length);
  };

  const nextQuestion = (ev: React.MouseEvent) => {
    setLastAnswerClicked(0);
    setDisableOptions(false);
    setShowResult(false);
    setQuestionCount((prev) => prev + 1);
  };

  const viewOverall = (ev: React.MouseEvent) => {
    setShowResult(false);
    setShowOverall(true);
  };

  const goBackToDashboard = (ev: React.MouseEvent) => {
    navigate('/dashboard');
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');

    if (!accessToken) {
        navigate('/');
    }

    const fetchData = async () => {
      const profileResponse = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const profileResponseJson = await profileResponse.json();
      setExpPoints(profileResponseJson.nu_exp_points);
      if (profileResponseJson.nu_exp_points > 0) {
        setExpColor('success');
      } else if (profileResponseJson.nu_exp_points < 0) {
        setExpColor('danger');
      }

      const quizResponse = await fetch(`${process.env.REACT_APP_API_URL}/quizzes/${quizId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const quizResponseJson = await quizResponse.json();
      setCurrentQuiz(quizResponseJson);

      setTimeout(() => setIsLoading(false), 500);
    }

    fetchData();
  }, [navigate, quizId]);

  return (
    <>
      <Menubar />
      <Layout>
        {
          isLoading ?
            <div className="mt-2 text-center">
              <p>Carregando quiz, por favor aguarde</p>
              <Spinner />
            </div> :
            showOverall ?
              <div className="mt-2 text-center">
                <p>Sua experiência atual é <b className={`text-${expColor}`}>{expPoints}XP</b></p>
                <p className="fs-3">{currrentQuiz.vc_title}</p>
                <p>Você acertou <b>{qtyRight}</b> pergunta{qtyRight === 1 ? '' : 's'} e errou <b>{qtyWrong}</b> pergunta{qtyWrong === 1 ? '' : 's'}</p>
                <p>Sua porcentagem de acertos foi de <b>{(qtyRight / (qtyRight + qtyWrong) * 100).toFixed(2).replace('.', ',')}%</b></p>
                <Button variant="link" size="lg" onClick={goBackToDashboard}>
                  Jogar outro quiz
                </Button>
              </div> :
              <div className="mt-2 text-center">
                <p>Sua experiência atual é <b className={`text-${expColor}`}>{expPoints}XP</b></p>
                <p className="fs-3">{currrentQuiz.vc_title}</p>
                <p className="text-secondary">Pergunta {questionCount + 1} de {currrentQuiz.questions.length}</p>
                <p className="fs-5">{currrentQuiz.questions[questionCount].vc_text}</p>
                <Row>
                  {currrentQuiz.questions[questionCount].answers.map((item: any, i: number) => (
                    <Col key={i} sm={12}>
                      <div className="d-grid mb-3">
                        <Button
                          variant={
                            !isAnswerCorrect && item.pk_answer === theAnswer && showResult ? 'success' :
                            item.pk_answer === lastAnswerClicked && showResult ? (isAnswerCorrect ? 'success' : 'danger') : 'outline-secondary'
                          }
                          size="lg"
                          onClick={(ev) => { sendAnswer(ev, item.pk_answer) }}
                          disabled={disableOptions}
                        >
                          {item.vc_option}
                        </Button>
                      </div>
                    </Col>
                  ))}
                </Row>
                {
                  showResult &&
                  <div className="mt-3">
                    {
                      isAnswerCorrect ?
                        <p>Resposta <b className="text-success">correta</b>, você ganhou <b className="text-success">+50XP</b></p> :
                        <p>Resposta <b className="text-danger">errada</b>, você perdeu <b className="text-danger">-15XP</b></p>
                    }
                    {
                      isQuizFinished ?
                        <Button variant="link" size="lg" onClick={viewOverall}>
                          Finalizar
                        </Button> :
                        <Button variant="link" size="lg" onClick={nextQuestion}>
                          Avançar
                        </Button>
                    }
                  </div>
                }
              </div>
        }
      </Layout>
    </>
  );
}

export default Quiz;
