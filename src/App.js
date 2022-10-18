import Table from './components/Table/Table';
import files from './data/files.json';

function App() {    
  return (
    <Table data={files} />
  );
}

export default App;
