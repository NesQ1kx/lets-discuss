package mobile.lab3.note.common.responses;


public class ErrorResponse extends Response {
    private static final String DEFAULT_MESSAGE = "Ошибка";
    private static final int DEFAULT_ERROR_CODE = 400;

    private String error;

    public ErrorResponse(int code, String message) {
        this.error = message;
        this.code = code;
    }

    public ErrorResponse() {
        this(DEFAULT_ERROR_CODE, DEFAULT_MESSAGE);
    }

    public ErrorResponse(int code) {
        this(code, DEFAULT_MESSAGE);
    }

    public ErrorResponse(String message) { this(DEFAULT_ERROR_CODE, message); }

    public String getError() {
        return error;
    }


}