import axios from 'axios';
import _ from 'lodash';

const createForm = () => {
  const form = document.createElement('form');
  form.innerHTML = `
    <form id="registrationForm">
    <div class="form-group">
        <label for="inputName">Name</label>
        <input type="text" class="form-control" id="inputName" placeholder="Введите ваше имя" name="name" required>
    </div>
    <div class="form-group">
        <label for="inputEmail">Email</label>
        <input type="text" class="form-control" id="inputEmail" placeholder="Введите email" name="email" required>
    </div>
    <input type="submit" value="Submit" class="btn btn-primary">
    </form>`;
  const formContainer = document.querySelector('.form-container');
  formContainer.appendChild(form);
  return form;
};

export default () => {
  const form = createForm();

  form.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(form);
    axios.post('/users', {
      name: formData.get('name'),
      email: formData.get('email'),
    })
      .then((response) => {
        document.body.innerHTML = `<p>${response.data.message}</p>.`;
      }).catch((error) => {
        console.error(error);
      });
  });

  const validate = {
    name: (input) => (input.trim().length ? {} : { errors: ['имя не может быть пустым'] }),
    email: (input) => (/\w+@\w+/.test(input) ? {} : { errors: ['невалидный email'] }),
  };

  function updateInputStatus(input, isValid) {
    input.classList.remove('is-valid', 'is-invalid');

    if (_.isEmpty(isValid)) {
      input.classList.add('is-valid');
    } else {
      input.classList.add('is-invalid');
    }
  }

  form.addEventListener('input', (e) => {
    e.preventDefault();
    const currentInputValue = e.target.value;
    const target = e.target.name;
    const isValid = validate[target](currentInputValue);
    updateInputStatus(e.target, isValid);
  });
};
