import Head from '@/components/Head'
import PageLayout from '@/components/PageLayout'
import SectionBox from '@/components/SectionBox'
import Heading from '@/components/LayoutComponents/Heading'
import UnderConstruction from '@/components/LayoutComponents/UnderConstruction'
import IciwiMakerForm from '@/components/IciwiMaker/IciwiMakerForm'
import calculatePaths, { toFares, translateMap } from '@/components/Scripts/MostConvenientPath'

export default function Home() {

  const download = (filename: string, text: string) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  };

  const processTable = (routes: [{line: string, stations:[string]}], fares: [[string]]) => {
    // process fare table
    let classNames: Array<string>;
    let fareMap: {[k: string]: {[k: string]: string}} = {};
    fares.forEach((stage, idx) => {
      if (idx === 0) {
        classNames = stage.slice(1);
      }
      else {
        let distance = stage[0];
        let fares = stage.slice(1);
        classNames.forEach( (name, jdx) => {
          fareMap[name] = fareMap[name] ?? {};
          fareMap[name][distance] = fares[jdx];
        });
      }
    });

    let pathMap = calculatePaths(translateMap(routes))
    let fareChart = toFares(pathMap, fareMap);
    console.log(fareChart);
  };

  return (
    <>
      <Head
        title="Iciwi Maker | Limaru"
        description="Create your own fares.yml!"
        author="YJJcoolcool"
        keywords="limaru, limaru city server, limaru minecraft server"
      />
      <PageLayout title='Iciwi Maker'>
        <UnderConstruction type="page" />
        <SectionBox>
          <Heading level={2}>Create your own fares.yml here!</Heading>
          <IciwiMakerForm submitFunction={processTable}></IciwiMakerForm>
        </SectionBox>
      </PageLayout>
    </>
  )
}
