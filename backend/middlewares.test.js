const { validateNewNotesSchema, authenticate, isNoteOwner } = require("./middlewares");
const ExpressError = require("./Utils/ExpressError");
const jwt = require("jsonwebtoken");
const Note = require("./models/Notes");

// Mock external dependencies to isolate middleware business logic
jest.mock("jsonwebtoken");
jest.mock("./models/Notes");

describe("Middlewares Unit Tests", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        // Reset request and response mocks before each test
        req = {
            cookies: {},
            body: {},
            params: {}
        };
        res = {};
        next = jest.fn();
        
        // Reset all mock call histories and implementations
        jest.clearAllMocks();
    });

    describe("validateNewNotesSchema", () => {
        it("should allow request to proceed if body contains valid note properties", () => {
            req.body = {
                note: {
                    title: "Coding Tasks",
                    description: "Refactor unit tests"
                }
            };

            validateNewNotesSchema(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith();
        });

        it("should return a 400 ExpressError if note title is missing", () => {
            req.body = {
                note: {
                    description: "Missing title validation test"
                }
            };

            validateNewNotesSchema(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            const error = next.mock.calls[0][0];
            expect(error).toBeInstanceOf(ExpressError);
            expect(error.statusCode).toBe(400);
            expect(error.message).toContain('"note.title" is required');
        });
    });

    describe("authenticate", () => {
        it("should return a 401 ExpressError if JWT token cookie is missing", () => {
            req.cookies = {};

            authenticate(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            const error = next.mock.calls[0][0];
            expect(error).toBeInstanceOf(ExpressError);
            expect(error.statusCode).toBe(401);
            expect(error.message).toContain("Kindly Login/SignUp");
        });

        it("should set req.user and call next if a valid token is provided", () => {
            req.cookies.token = "valid-jwt-token";
            const mockUserPayload = { user: "mock-user-123" };
            
            jwt.verify.mockReturnValue(mockUserPayload);

            authenticate(req, res, next);

            expect(jwt.verify).toHaveBeenCalledWith("valid-jwt-token", "seougw9ur");
            expect(req.user).toBe("mock-user-123");
            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith();
        });
    });

    describe("isNoteOwner", () => {
        it("should return a 400 ExpressError if note ID does not exist in the database", async () => {
            req.params.id = "invalid-id-999";
            
            // Mock Mongoose finding no document matching the ID
            Note.findById.mockResolvedValue(null);

            await isNoteOwner(req, res, next);

            expect(Note.findById).toHaveBeenCalledWith("invalid-id-999");
            expect(next).toHaveBeenCalledTimes(1);
            const error = next.mock.calls[0][0];
            expect(error).toBeInstanceOf(ExpressError);
            expect(error.statusCode).toBe(400);
            expect(error.message).toBe("no such note exist");
        });

        it("should return a 401 ExpressError if the logged-in user is not the note owner", async () => {
            req.user = "hacker-user-id";
            req.params.id = "target-note-id";
            
            const mockNote = {
                _id: "target-note-id",
                owner: "actual-owner-id"
            };
            Note.findById.mockResolvedValue(mockNote);

            await isNoteOwner(req, res, next);

            expect(Note.findById).toHaveBeenCalledWith("target-note-id");
            expect(next).toHaveBeenCalledTimes(1);
            const error = next.mock.calls[0][0];
            expect(error).toBeInstanceOf(ExpressError);
            expect(error.statusCode).toBe(401);
            expect(error.message).toBe("You are not the owner of this note");
        });

        it("should call next without error if the logged-in user matches the note owner", async () => {
            req.user = "owner-user-id";
            req.params.id = "target-note-id";

            const mockNote = {
                _id: "target-note-id",
                owner: "owner-user-id"
            };
            Note.findById.mockResolvedValue(mockNote);

            await isNoteOwner(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith();
        });
    });
});
