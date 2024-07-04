export default interface EventRequest {
    name: string;
    tagsIds: number[];
    src: string;
    startDate: Date;
    endDate: Date;
}