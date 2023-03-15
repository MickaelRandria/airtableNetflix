import { useState } from "react";

function FormulairePage() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
  });

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    alert(
      `Nom : ${formData.nom}\nPrénom : ${formData.prenom}\nEmail : ${formData.email}`
    );
  };

  return (
    <div>
      <h2>Félicitations, vous avez réussi le quizz !</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="nom">Nom :</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleFormChange}
          required
        />
        <label htmlFor="prenom">Prénom :</label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          value={formData.prenom}
          onChange={handleFormChange}
          required
        />
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleFormChange}
          required
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default FormulairePage;
