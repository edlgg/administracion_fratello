export default function (uno, dos) {
  const user = uno.$fire.auth.currentUser
  console.log('AAAAB', user)
  // if (!user) uno.redirect('/login')
  // uno.redirect('/inspire')
}
