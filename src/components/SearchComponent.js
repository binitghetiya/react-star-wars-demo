import React, { Component } from "react";
import {
  Container,
  Col,
  Input,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardText,
  InputGroup,
  ListGroup,
  Progress,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Table,
  InputGroupAddon
} from "reactstrap";
import { getPlanetsRequest } from "../redux/Apis";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      totalPopulation: 0,
      planetDetails: "",
      showModal: false
    };
  }
  componentDidMount() {
    this.searchPlaces("", true);
  }

  searchPlaces = async (serch, defaultCall) => {
    const searchKeyword = serch.trim();
    if (searchKeyword || defaultCall) {
      const res = await getPlanetsRequest(searchKeyword);
      if (res) {
        this.setState({ planets: res });
        let totalPopulation = 0;
        if (res.length) {
          for (let i = 0; i < res.length; i++) {
            const element = res[i];
            if (element.population && element.population !== "unknown") {
              totalPopulation += parseFloat(element.population);
            }
          }
        }

        this.setState({ totalPopulation: totalPopulation });
        console.log(totalPopulation);
        return null;
      }
    } else {
      this.setState({ planets: [] });
      return null;
    }
  };

  toggle = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  renderPlanets = planets => {
    const usablePlanets = planets.filter(
      planet => planet.name !== "unknown" && planet.population !== "unknown"
    );
    const { totalPopulation } = this.state;
    usablePlanets.sort(
      (a, b) => parseFloat(b.population) - parseFloat(a.population)
    );
    return usablePlanets.map((planet, index) => {
      const persentage = ((planet.population * 100) / totalPopulation).toFixed(
        3
      );
      return (
        <Card key={planet.name} className="mt-2">
          <CardBody>
            <CardTitle style={{ marginBottom: 4, fontSize: 24 }}>
              <b>{planet.name}</b>
            </CardTitle>
            <CardText style={{ marginBottom: 2 }}>
              <b>{planet.name}</b> is made of mostly <b>{planet.terrain}</b> and
              has gravity of{" "}
              <b>
                {planet.gravity && planet.gravity !== "N/A"
                  ? planet.gravity
                  : "1 standard"}
              </b>
              .
            </CardText>
            <CardText style={{ marginBottom: 2 }}>
              It has population of <b>{planet.population}</b> which is{" "}
              <b>{persentage}%</b> of total population from current list.
            </CardText>
            <Progress value={Math.ceil(persentage)} style={{ marginTop: 4 }} />
            <button
              className="btn btn-info mt-2"
              onClick={() =>
                this.setState({ showModal: true, planetDetails: planet })
              }
            >
              View Details
            </button>
          </CardBody>
        </Card>
      );
    });
  };

  render() {
    const { planetDetails, planets } = this.state;
    return (
      <Container>
        <Row>
          <Col></Col>
        </Row>
        <Row>
          <Col xs="0" sm="1"></Col>
          <Col xs="12" sm="10" md="10">
            <InputGroup>
              <Input
                type="text"
                name="searchKeyword"
                placeholder={"Search For Planets"}
                onChange={e => this.searchPlaces(e.target.value)}
              />
              <InputGroupAddon addonType="append">
                <Button color="secondary">Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
          <Col sm="4"></Col>
        </Row>
        <br />
        <Row>
          <Col xs="0" sm="1" md="1"></Col>
          <Col xs="12" sm="10" md="10">
            <ListGroup>{this.renderPlanets(planets)}</ListGroup>
          </Col>
          <Col xs="0" sm="1" md="1"></Col>
          {planetDetails ? (
            <Modal isOpen={this.state.showModal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Planet Detail</ModalHeader>
              <ModalBody>
                <Table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{planetDetails.name}</td>
                    </tr>
                    <tr>
                      <th>Surface Water (in %)</th>
                      <td>{planetDetails.surface_water}</td>
                    </tr>
                    <tr>
                      <th>Gravity</th>
                      <td>{planetDetails.gravity}</td>
                    </tr>
                    <tr>
                      <th>Orbital Period</th>
                      <td>{planetDetails.orbital_period}</td>
                    </tr>
                    <tr>
                      <th>Diameter</th>
                      <td>{planetDetails.diameter}</td>
                    </tr>
                    <tr>
                      <th>Population</th>
                      <td>{planetDetails.population}</td>
                    </tr>
                  </tbody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          ) : null}
        </Row>
      </Container>
    );
  }
}

export default Search;
