// Taken from Stackoverflow
export const email = value => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(value).toLowerCase())) return 'Email address is invalid';
};

export const required = value =>
  !value || !value.toString().length ? 'This field is required' : null;
