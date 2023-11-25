package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A Recette.
 */
@Entity
@Table(name = "recette")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Recette implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "duree_preparation")
    private Integer dureePreparation;

    @ManyToOne
    private User recettes;

    @ManyToOne
    @JsonIgnoreProperties(value = { "recettes" }, allowSetters = true)
    private Etape etapes;

    @ManyToOne
    @JsonIgnoreProperties(value = { "recettes" }, allowSetters = true)
    private Ingredient ingredients;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Recette id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public Recette nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getDureePreparation() {
        return this.dureePreparation;
    }

    public Recette dureePreparation(Integer dureePreparation) {
        this.setDureePreparation(dureePreparation);
        return this;
    }

    public void setDureePreparation(Integer dureePreparation) {
        this.dureePreparation = dureePreparation;
    }

    public User getRecettes() {
        return this.recettes;
    }

    public void setRecettes(User user) {
        this.recettes = user;
    }

    public Recette recettes(User user) {
        this.setRecettes(user);
        return this;
    }

    public Etape getEtapes() {
        return this.etapes;
    }

    public void setEtapes(Etape etape) {
        this.etapes = etape;
    }

    public Recette etapes(Etape etape) {
        this.setEtapes(etape);
        return this;
    }

    public Ingredient getIngredients() {
        return this.ingredients;
    }

    public void setIngredients(Ingredient ingredient) {
        this.ingredients = ingredient;
    }

    public Recette ingredients(Ingredient ingredient) {
        this.setIngredients(ingredient);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Recette)) {
            return false;
        }
        return id != null && id.equals(((Recette) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Recette{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", dureePreparation=" + getDureePreparation() +
            "}";
    }
}
