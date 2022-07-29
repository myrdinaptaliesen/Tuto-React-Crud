import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/Menu";

const EditPlayer = () => {
  const { player } = useParams();
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [height, setHeight] = useState("");
  const [position, setPosition] = useState("");
  const [photoPlayer, setphotoPlayer] = useState(null);
  const [club_id, setClubId] = useState("");
  const [validationError, setValidationError] = useState({});
  useEffect(() => {
    getPlayer();
  }, []);
  // GET - Récupère les valeurs de la fiche avec l'API
  const getPlayer = async () => {
    await axios
      .get(`http://localhost:8000/api/players/${player}`)
      .then((res) => {
        setfirstName(res.data.firstName);
        setClubId(res.data.club_id);
        setlastName(res.data.lastName);
        setHeight(res.data.height);
        setPosition(res.data.position);
        setphotoPlayer(res.data.photoPlayer);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const changeHandler = (event) => {
    setphotoPlayer(event.target.files[0]);
  };
  //Fonction d'ajout d'un player
  const updatePlayer = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("height", height);
    formData.append("position", position);
    formData.append("club_id", club_id);
    formData.append("photoPlayer", photoPlayer);

    if (photoPlayer !== null) {
      formData.append("photoPlayer", photoPlayer);
    }

    await axios
      .post(`http://localhost:8000/api/players/${player}`, formData)
      .then(navigate("/players"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };
  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Modifier un joueur</h4>
                <hr />
                <div className="form-wrapper">
                  {Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {Object.entries(validationError).map(
                              ([key, value]) => (
                                <li key={key}>{value}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  <Form onSubmit={updatePlayer}>
                    <Row>
                      <Col>
                        <Form.Group controlId="firstName">
                          <Form.Label>Nom du joueur</Form.Label>
                          <Form.Control
                            type="text"
                            value={lastName}
                            onChange={(event) => {
                              setlastName(event.target.value);
                            }}
                          />
                        </Form.Group>
                        <Form.Group controlId="lastName">
                          <Form.Label>Prenom du joueur</Form.Label>
                          <Form.Control
                            type="text"
                            value={firstName}
                            onChange={(event) => {
                              setfirstName(event.target.value);
                            }}
                          />
                        </Form.Group>
                        <Form.Group controlId="height">
                          <Form.Label>Taille du joueur</Form.Label>
                          <Form.Control
                            type="text"
                            value={height}
                            onChange={(event) => {
                              setHeight(event.target.value);
                            }}
                          />
                        </Form.Group>
                        <Form.Group controlId="position">
                          <Form.Label>Position du joueur</Form.Label>
                          <Form.Control
                            type="text"
                            value={position}
                            onChange={(event) => {
                              setPosition(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="photoPlayer" className="mb-3">
                          <Form.Label>Photo</Form.Label>
                          <Form.Control type="file" onChange={changeHandler} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      variant="primary"
                      className="mt-2"
                      size="lg"
                      block="block"
                      type="submit"
                    >
                      Créer
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditPlayer;
