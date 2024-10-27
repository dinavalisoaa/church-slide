import "../../App.css";

function Verses(props: { data: any; and: any; }) {
  const data = props.data;
  // const data_plot = data.split("\n");
  const return_values = data.map((element:string) => {
    return <p>{element}</p>;
  });
  return return_values;
}
export default Verses;
