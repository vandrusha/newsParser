const formatter = (text) => {
  //console.log(text)
  const formattedText = text
  .replace(/&nbsp;/g, '')
  .replace(/"|„|”/g,"'")
  .replace(/(\r\n|\r|\n)/g,"\n")
  //console.log(formattedText)
  return formattedText;
}

export default formatter;
