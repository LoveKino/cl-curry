import assert from "assert";
import curry from "../index";

describe("base", () => {
    it("base", () => {
        let f = (x, y) => x - y;

        let b = curry(f, 2);
        assert.equal(b(1, 0)(2, 1), -1);
    });

    it("order", () => {
        let f = (x, y) => x - y;

        let b = curry(f, 2);
        assert.equal(b(2, 1)(1, 0), -1);
    });

    it("empty", () => {
        let f = () => 10;

        let b = curry(f);
        assert.equal(b(), 10);
    });

    it("fun", (done) => {
        let f = 10;

        try {
            let b = curry(f, 0);
        } catch (err) {
            done();
        }
    });

    it("count", (done) => {
        let f = () => 10;
        try {
            let b = curry(f, "10");
        } catch (err) {
            done();
        }
    });

    it("index", (done) => {
        let f = (x, y) => x - y;
        try {
            let b = curry(f, 2);
            b(2, 0)(1, "1")
        } catch (err) {
            done();
        }
    });

    it("default index", () => {
        let f = (x, y) => x - y;
        let b = curry(f, 2);
        assert.equal(b(2)(1), 1);
    });

    it("finished", () => {
        let f = (x, y) => x - y;
        let b = curry(f, 2);
        let step1 = b(2);
        let step2 = b(1);
        assert.equal(curry.isFinished(step1) === false, true);
        assert.equal(curry.isFinished(step2) === true, true);
    });
});