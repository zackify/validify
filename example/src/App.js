import React, { Component } from 'react';

import Input from './input';
import Form from 'react-validify';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Form rules={{ email: 'email|required', password: 'required|min:8' }}>
          <Input name="email" />
          <Input name="password" type="password" />

          <div
            submit
            onClick={values => console.log('if validation passes, this logs')}
          >
            Submit!
          </div>
        </Form>
      </div>
    );
  }
}

export default App;
