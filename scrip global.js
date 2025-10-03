document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-dark');
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
  if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    });
    
    /* sect INFY5 */

    /*fin */

    /* sect NALP */