(() => {
  const menu = document.querySelector('.menu'), nav = document.querySelector('#navigation');
  if (menu && nav) {
    menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));
  }
  const form = document.querySelector('#enquiry-form'), openButton = document.querySelector('.enquiry-open');
  const interests = {inside:'Inside / Private Buying Desk', origin:'Origin / Private Marketplace', credentials:'Request credentials', general:'General enquiry'};
  const confirmation = document.querySelector('#enquiry-confirmation');
  function openEnquiry(key='general', focus=true) {
    if (!form) return;
    form.hidden = false; confirmation.hidden = true;
    openButton.setAttribute('aria-expanded','true');
    form.elements.interest.value = interests[key] || interests.general;
    if (focus) form.elements.name.focus({preventScroll:true});
  }
  if (form && openButton) {
    openButton.addEventListener('click', () => { openEnquiry('general'); document.querySelector('#enquiry').scrollIntoView(); });
    document.querySelectorAll('[data-interest]').forEach(a => a.addEventListener('click', event => {
      event.preventDefault(); openEnquiry(a.dataset.interest); document.querySelector('#enquiry').scrollIntoView();
      history.replaceState(null,'',location.pathname+'#enquiry');
    }));
    const params = new URLSearchParams(location.search), key=params.get('interest');
    if (key || location.hash === '#enquiry') openEnquiry(key || 'general', false);
    window.addEventListener('hashchange', () => { if (location.hash === '#enquiry') openEnquiry('general',false); });
    form.addEventListener('submit', async event => {
      event.preventDefault(); if (!form.reportValidity()) return;
      const submit = form.querySelector('[type="submit"]'), status = document.querySelector('#form-status');
      submit.disabled=true; form.setAttribute('aria-busy','true'); status.textContent='Submitting enquiry…';
      const controller = new AbortController(), timeout=setTimeout(()=>controller.abort(),20000);
      try {
        const response = await fetch('/', {method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(form)).toString(),signal:controller.signal});
        if (!response.ok) throw new Error('Submission failed');
        form.reset(); form.hidden=true; status.textContent=''; openButton.setAttribute('aria-expanded','false');
        confirmation.hidden=false; confirmation.focus();
      } catch (error) {
        status.textContent='We couldn’t confirm your submission. Please try again or email info@mcwconnect.com.'; status.focus();
      } finally { clearTimeout(timeout); submit.disabled=false; form.removeAttribute('aria-busy'); }
    });
  }
  if (document.querySelector('[data-about-entry]') && !location.hash && !location.search) document.querySelector('#about').scrollIntoView({behavior:'instant'});
})();
