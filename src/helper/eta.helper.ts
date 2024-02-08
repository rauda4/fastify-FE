import { eta } from "../app";

function viewEtaHelper() {
     function compile(source:any, data:any){

        const result = eta.render(source, data)
        return result

     }
     return { compile }
}

export const ViewEtaHelper = viewEtaHelper()
