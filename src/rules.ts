export type RuleFn = (
  value: string,
  values: { [key: string]: string },
) => string | boolean | undefined | null;

// Taken from Stackoverflow
export const email: RuleFn = value => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(value).toLowerCase())) return 'Email address is invalid';
};

export const required: RuleFn = value =>
  !value || !value.toString().length ? 'This field is required' : null;
