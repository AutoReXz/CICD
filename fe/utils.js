const API_CONFIG = {
  // Menggunakan variabel window untuk memeriksa apakah ada API_URL yang diberikan oleh server
  DEFAULT_URL: window.API_URL || '/api',
  
  // Get the API URL
  getApiUrl: function() {
    console.log('Current API URL:', this.DEFAULT_URL);
    return this.DEFAULT_URL;
  }
};
