import { UpdateHistoryContent } from './update-history-content';

export interface UpdateHistory{
    update_person: string;
    update_time: Date;
    update_content: UpdateHistoryContent[];
}