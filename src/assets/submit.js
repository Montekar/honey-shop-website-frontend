function submitForm() {

  const form = document.querySelector('.my-form')
  const formData = new FormData(form)
  const url = 'https://formsubmit.co/b6f5a3ba3aa3f18733c893ba7550cfd2'
  fetch(
    url,
    {
      method: 'POST',
      body: formData
    }
  )
  return false
}
