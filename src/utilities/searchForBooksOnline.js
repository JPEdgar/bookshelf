import axios from "axios";

const searchForBooksOnline = async (query) => {
  /* &maxResults= <int> 
     (40 max), how many results on the search query 
  */
  /* &startIndex= <int> 
     int > starts at 0, the page number of the search results 
  */
  /* q= <string>
     query > search string
     "query" > query in quotes = exact phrase
     -query > query w/ - in front means to exclude terms
     special keywords: 
      intitle: <string>
      inauthor: <string>
      inpublisher: <string>
      subject: <string>
      isbn: <string>
      lccn: <string>
      oclc: <string>
*/
/* orderBy=
      relevant (default)
      newest
      
*/
  const { data } = await axios.get(query);
  // console.log(data)
  return data.items;
};

export default searchForBooksOnline;
