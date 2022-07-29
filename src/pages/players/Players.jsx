import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Menu from "../../components/Menu";
import axios from "axios";
import { Link } from "react-router-dom";

const Players = () => {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    displayPlayers();
  }, []); // Sans les crochets ça tourne en boucle

  const displayPlayers = async () => {
    await axios.get("http://localhost:8000/api/players").then((res) => {
      setPlayers(res.data.data);
    });
  };
  const deletePlayer = (id) => {
    axios
      .delete(`http://localhost:8000/api/players/${id}`)
      .then(displayPlayers);
  };
  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom du joueur</th>
              <th>Prénom du joueur</th>
              <th>Taille</th>
              <th>Position</th>
              <th>Équipe du joueur</th>
              <th>Photo du joueur</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td>{player.firstName}</td>
                <td>{player.lastName}</td>
                <td>{player.height}</td>
                <td>{player.position}</td>
                <td>{player.nameClub}</td>

                <td>
                  <img
                    src={`http://localhost:8000/storage/uploads/${player.photoPlayer}`}
                    width="75px"
                  />
                </td>
                <td>
                  <Link
                    to={`/players/edit/${player.id}`}
                    className="btn btn-success me-2"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deletePlayer(player.id);
                    }}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default Players;
