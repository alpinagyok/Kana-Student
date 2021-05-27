import { GetState } from '..';
import { FetchStatus, MaterialBlock } from '../interfaces';

export const getMaterials = (state: GetState): MaterialBlock[] => state.materials.materials;
export const getMaterialsStatus = (state: GetState): FetchStatus => state.materials.status;
export const getMaterialsError = (state: GetState): string | undefined => state.materials.error;
