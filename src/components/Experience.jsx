import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  containerStyle: {
    marginBottom: 25,
  },
};

const Projects = (props) => {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Container style={styles.containerStyle}>
            {/* Awards Section */}
            <h1 style={{ marginTop: '2rem' }}>Awards</h1>
            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
              {data.projects?.map((project) => (
                <Fade key={project.title}>
                  <ProjectCard project={project} />
                </Fade>
              ))}
            </Row>

            {/* Certifications Section */}
            <h1 style={{ marginTop: '2rem' }}>Certifications</h1>
            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
              {data.certifications?.map((cert) => (
                <Fade key={cert.title}>
                  <ProjectCard project={cert} />
                </Fade>
              ))}
            </Row>
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
