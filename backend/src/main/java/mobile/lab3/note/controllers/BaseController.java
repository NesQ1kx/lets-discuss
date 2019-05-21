package mobile.lab3.note.controllers;

import mobile.lab3.note.common.responses.ErrorResponse;
import mobile.lab3.note.common.responses.Response;
import mobile.lab3.note.common.responses.SuccessResponse;

import javax.servlet.http.HttpServletResponse;

public class BaseController {
    protected Response error(HttpServletResponse response)  {
        response.setStatus(400);
        return new ErrorResponse();
    }

    protected Response error(HttpServletResponse response, int code)  {
        response.setStatus(code);
        return new ErrorResponse(code);
    }

    protected Response error(HttpServletResponse response, int code, String message)  {
        response.setStatus(code);
        return new ErrorResponse(code,message);
    }

    protected Response success(HttpServletResponse response, Object object) {
        response.setStatus(200);
        return new SuccessResponse(object);
    }

    protected Response success(HttpServletResponse response, Object object, int code) {
        response.setStatus(code);
        return new SuccessResponse(object, code);
    }

    protected Response success(HttpServletResponse response, Object object, int code, String message) {
        response.setStatus(code);
        return new SuccessResponse(object, code, message);
    }

}
