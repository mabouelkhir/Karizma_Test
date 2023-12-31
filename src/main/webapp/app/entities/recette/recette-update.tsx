import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IEtape } from 'app/shared/model/etape.model';
import { getEntities as getEtapes } from 'app/entities/etape/etape.reducer';
import { IIngredient } from 'app/shared/model/ingredient.model';
import { getEntities as getIngredients } from 'app/entities/ingredient/ingredient.reducer';
import { IRecette } from 'app/shared/model/recette.model';
import { getEntity, updateEntity, createEntity, reset } from './recette.reducer';

export const RecetteUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const etapes = useAppSelector(state => state.etape.entities);
  const ingredients = useAppSelector(state => state.ingredient.entities);
  const recetteEntity = useAppSelector(state => state.recette.entity);
  const loading = useAppSelector(state => state.recette.loading);
  const updating = useAppSelector(state => state.recette.updating);
  const updateSuccess = useAppSelector(state => state.recette.updateSuccess);

  const handleClose = () => {
    navigate('/recette');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
    dispatch(getEtapes({}));
    dispatch(getIngredients({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...recetteEntity,
      ...values,
      recettes: users.find(it => it.id.toString() === values.recettes.toString()),
      etapes: etapes.find(it => it.id.toString() === values.etapes.toString()),
      ingredients: ingredients.find(it => it.id.toString() === values.ingredients.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...recetteEntity,
          recettes: recetteEntity?.recettes?.id,
          etapes: recetteEntity?.etapes?.id,
          ingredients: recetteEntity?.ingredients?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="recette1App.recette.home.createOrEditLabel" data-cy="RecetteCreateUpdateHeading">
            Créer ou éditer un Recette
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="recette-id" label="Id" validate={{ required: true }} /> : null}
              <ValidatedField label="Nom" id="recette-nom" name="nom" data-cy="nom" type="text" />
              <ValidatedField
                label="Duree Preparation"
                id="recette-dureePreparation"
                name="dureePreparation"
                data-cy="dureePreparation"
                type="text"
              />
              <ValidatedField id="recette-recettes" name="recettes" data-cy="recettes" label="Recettes" type="select">
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="recette-etapes" name="etapes" data-cy="etapes" label="Etapes" type="select">
                <option value="" key="0" />
                {etapes
                  ? etapes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="recette-ingredients" name="ingredients" data-cy="ingredients" label="Ingredients" type="select">
                <option value="" key="0" />
                {ingredients
                  ? ingredients.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/recette" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Retour</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Sauvegarder
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default RecetteUpdate;
