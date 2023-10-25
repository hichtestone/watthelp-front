export const environment = {
  production: true,
  api_uri: 'https://api.recette.watthelp.fr',
  places_api_key: 'AIzaSyAkGmwZBoe-jsgJOlxUk3cZ1nGpuxnHVY0',
  availableLangs: ['fr', 'en', 'es'],
  mercure_hub: 'https://mercure.recette.sprintechno.com/.well-known/mercure',
  mercure_path: 'https://recette.watthelp.fr',

  snackbar_timer: 4000,

  // User configuration
  user: {
    // Password security
    password: {
      min_length: 8,
      case_diff_required: true,
      number_required: false,
      special_char_required: true
    }
  }
};
