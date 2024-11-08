export const textElements: TextElement[] = [
    {
        id: '4',
        title: "top",
        content: "Save The D",
        top: 100,
        left: 130,
        fontFamily: "Cursive",
        fontColor: "#825700",
        fontSize: 23
    },
    {
        id: '1',
        title: "name",
        content: "Isable Morcade",
        top: 130,
        left: 100,
        fontFamily: "Cursive",
        fontColor: "#825700",
        fontSize: 33
    },
    {
        id: '2',
        title: "and",
        content: "&",
        top: 160,
        left: 150,
        fontFamily: "Cursive",
        fontColor: "red",
        fontSize: 23
    },
    {
        id: '3',
        title: "second name",
        content: "Chad Gibbons",
        top: 190,
        left: 100,
        fontFamily: "Cursive",
        fontColor: "#825700",
        fontSize: 33
    },
    {
        id: '4',
        title: "time",
        content: "two Oclick in the afternoon",
        top: 300,
        left: 80,
        fontFamily: "Cursive",
        fontColor: "#825700",
        fontSize: 23
    },
    {
        id: '5',
        title: "reception",
        content: "Reception to fellow",
        top: 330,
        left: 100,
        fontFamily: "Cursive",
        fontColor: "#825700",
        fontSize: 23
    },
]

export type TextElement = {
    id: string,
    title: string,
    content: string,
    top: number,
    left: number,
    fontFamily: string,
    fontColor: string,
    fontSize: number,
}