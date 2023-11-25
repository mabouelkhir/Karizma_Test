import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './recette.reducer';

export const RecetteDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const recetteEntity = useAppSelector(state => state.recette.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="recetteDetailsHeading">Recette</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">Id</span>
          </dt>
          <dd>{recetteEntity.id}</dd>
          <dt>
            <span id="nom">Nom</span>
          </dt>
          <dd>{recetteEntity.nom}</dd>
          <dt>
            <span id="dureePreparation">Duree Preparation</span>
          </dt>
          <dd>{recetteEntity.dureePreparation}</dd>
          <dt>Recettes</dt>
          <dd>{recetteEntity.recettes ? recetteEntity.recettes.id : ''}</dd>
          <dt>Etapes</dt>
          <dd>{recetteEntity.etapes ? recetteEntity.etapes.id : ''}</dd>
          <dt>Ingredients</dt>
          <dd>{recetteEntity.ingredients ? recetteEntity.ingredients.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/recette" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Retour</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/recette/${recetteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editer</span>
        </Button>
      </Col>
    </Row>
  );
};

export default RecetteDetail;
