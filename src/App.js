
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Description from './components/description/Description';
import {Helmet} from "react-helmet";

import ImageUpload from './testting/ImageUpload';

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog-goutham</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Description/>
      {/* <ImageUpload/> */}
    </div>
  );
}

export default App;
