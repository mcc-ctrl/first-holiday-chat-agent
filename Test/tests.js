//Test runs on page load when file path is opened within browser

const chai = window.chai
const expect = chai.expect


describe('compare function', () => {
    const utterancesArray = [
        ["how are you", "how is life", "how are things"],
        ["hi", "hey", "hello", "good morning", "good afternoon"],
        ["i would like to go on holiday", "holiday", "holidays"],
        ["i would like to see your flight times", "flight", "flights"]
    ];

    const answersArray = [
        ["Fantastic, how are you?"],
        ["Hi! How can I help?",],
        ["So you're looking to go on holiday. Would you like to see our timetable?"],
        ["Ok, would you like to view our flights timetable?"]
    ];

    it('returns a reply from the answersArray when a matching utterance is found', () => {
        const result = compare(utterancesArray, answersArray, 'how are you');
        expect(answersArray[0]).to.include(result);
    });



    it('returns undefined when no matching utterance or keyword is found', () => {
        const result = compare(utterancesArray, answersArray, 'What is the time?');
        expect(result).to.be.undefined;
    });
});