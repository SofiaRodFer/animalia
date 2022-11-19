import { PetModel } from "../models/PetModel";

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Home: undefined;
            Cadastro: undefined;
            Editar: undefined;
            EdicaoDetalhes: {
                pet: PetModel
            };
            Detalhes: {
                pet: PetModel
            }
        }
    }
}