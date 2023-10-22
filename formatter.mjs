const formatter = (text) => {
  //console.log(text)
  const formattedText = text
  .replace(/&nbsp;/g, '')
  .replace(/"|„|”/g,"'")
  //console.log(formattedText)
  return formattedText;
}

export default formatter;
