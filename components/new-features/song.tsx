import { useEffect, useState } from "react";

// import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
// import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
// import RevealMath from 'reveal.js/plugin/math/math';
// import RevealSearch from 'reveal.js/plugin/search/search';

import Verses from "@/components/new-features/verse";
import * as url from "node:url";
function Song(props: {
    andininy: string | null;
    hira: string;
    key: string | number | undefined;
    title: string | null;
}) {
    const [data, setData] = useState<any[]>([]);
    const [repartition,setRepartition] = useState<number | null>(3);
    const [includeAnd, setIncludeAnd] = useState<string[]>([]);
    const isPresent = (and_index: number) => {
        let cpt = 0;
        if (includeAnd.length > 0) {
            includeAnd.map((value) => {
                if (value != undefined && and_index == parseInt(value)) {
                    cpt++;
                }
            });
            if (cpt > 0) {
                return true;
            }
            return false;
        }
        if (includeAnd.length == 0) {
            return true;
        }

        return false;
    };
    useEffect(() => {
        const data = props.andininy;
        if (data != undefined) {
            setIncludeAnd(data.split(","));
        }
        fetch("../ressources/hira/01_fihirana_ffpm.json")
            .then((response) => response.json())
            .then((jsonData) => {
                const data_hira = jsonData.fihirana[props.hira].hira;
                setData(splitVerses(data_hira));
            })
            .catch((error) => console.error("Error fetching the JSON data:", error));
    }, []);
    const decom = (arr: string[]) => {
        const res = [];
        for (let i = 0; i < arr.length; i += 5) {
            res.push(arr.slice(i, i + 5));
        }
        return res;
    };

    function transformerChaine(chaine, tailleMax) {
        // Séparer la chaîne en lignes
        const lignes = chaine.split('\n');

        // Créer le tableau résultat
        const resultat = [];
        let sousTableau = [];

        lignes.forEach(ligne => {
            // Si le sous-tableau n'a pas atteint la taille maximale, ajouter la ligne
            if (sousTableau.length < tailleMax) {
                sousTableau.push(ligne);
            } else {
                // Sinon, ajouter le sous-tableau au résultat et en créer un nouveau
                resultat.push(sousTableau);
                sousTableau = [ligne];
            }
        });

        // Ajouter le dernier sous-tableau (si non vide) au résultat
        if (sousTableau.length > 0) {
            resultat.push(sousTableau);
        }

        return resultat;
    }

    const splitVerses = (data_hira: any[]) => {
        const data_vaovao: any[] = [];

        data_hira.map((data) => {
            const tononkira = data.tononkira;
            const tononkira_feno = tononkira.split("\n");
            const decomp =transformerChaine(tononkira,repartition);// decom(tononkira_feno);
            // console.log(data.andininy,"Bref=",transformerChaine(tononkira,3))
            decomp.map((value) => {
                data_vaovao.push({
                    andininy: data.andininy,
                    // order: index_i + index_j,
                    tononkira: value,
                    fiverenany: false,
                });
            });
        });
        return data_vaovao;
    };
    return (
        <>
            <section key={props.key+"45"}  data-background-image={"/ressources/images/baiboly"} >
                <section key={props.key+"78"}>
                    <div style={{ fontSize: 80 }}>{props.title}</div>
                </section>
                {data.map(
                    (hira, index) =>
                        isPresent(hira.andininy) && (
                            <section className="w-full"
                                key={(index + 1).toString() + "-1"}
                                hidden={false}
                            >
                                <div >
                                    <h1>{hira.andininy}</h1>
                                    <Verses data={hira.tononkira} and={hira.andininy} />{" "}
                                </div>
                            </section>
                        )
                )}
            </section>
        </>
    );
}
export default Song;
