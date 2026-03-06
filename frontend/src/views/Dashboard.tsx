import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Layout from '../components/Layout';
import Menubar from '../components/Menubar';

function Dashboard() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [expPoints, setExpPoints] = useState(0);
  const [expColor, setExpColor] = useState('secondary');
  const [quizCollection, setQuizCollection] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setUsername(profileResponseJson.vc_username);
      setExpPoints(profileResponseJson.nu_exp_points);
      if (profileResponseJson.nu_exp_points > 0) {
        setExpColor('success');
      } else if (profileResponseJson.nu_exp_points < 0) {
        setExpColor('danger');
      }

      const quizResponse = await fetch(`${process.env.REACT_APP_API_URL}/quizzes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const quizResponseJson = await quizResponse.json();
      setQuizCollection(quizResponseJson);

      setTimeout(() => setIsLoading(false), 500);
    }

    fetchData();
  }, [navigate]);

  return (
    <>
      <Menubar />
      <Layout>
        {
          isLoading ?
            <div className="mt-2 text-center">
              <p>Carregando informações, por favor aguarde</p>
              <Spinner />
            </div> :
            <div className="mt-2">
              <p>Seja bem-vindo(a) <b>{username}</b>, sua experiência atual é <b className={`text-${expColor}`}>{expPoints}XP</b></p>
              <p>Selecione um quiz abaixo para jogar:</p>
              <Row>
                {quizCollection.map((item, i) => (
                  <Col key={i} sm={12} md={3} lg={3}>
                    <Card>
                      <Card.Body>
                        <Card.Title>{item.vc_title}</Card.Title>
                        <Card.Subtitle className="text-secondary">{item.questions.length} pergunta{item.questions.length === 1 ? '' : 's'}</Card.Subtitle>
                        <Card.Text>{item.vc_text}</Card.Text>
                        <div className="text-center">
                          <Link className="btn btn-success" to={`/quiz/${item.pk_quiz}`}>Jogar</Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
        }
      </Layout>
    </>
  );
}

export default Dashboard;
