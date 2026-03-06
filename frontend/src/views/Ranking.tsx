import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Layout from '../components/Layout';
import Menubar from '../components/Menubar';

function Ranking() {
  const navigate = useNavigate();

  const [userCollection, setUserCollection] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');

    if (!accessToken) {
        navigate('/');
    }

    const fetchData = async () => {
      const usersResponse = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const usersResponseJson = await usersResponse.json();
      setUserCollection(usersResponseJson);

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
              <p>Carregando ranking, por favor aguarde</p>
              <Spinner />
            </div> :
            <div className="mt-2 text-center">
              <p>Ranking global dos usuários</p>
              <Table>
                <thead>
                  <tr>
                    <th>Posição</th>
                    <th>Usuário</th>
                    <th>Experiência</th>
                  </tr>
                </thead>
                <tbody>
                  {userCollection.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.vc_username}</td>
                      <td>{item.nu_exp_points}XP</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
        }
      </Layout>
    </>
  );
}

export default Ranking;
