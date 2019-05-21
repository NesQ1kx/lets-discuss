package mobile.lab3.note.common.responses;

import org.springframework.web.bind.annotation.ResponseBody;

@ResponseBody
public abstract class Response {
    protected int code;

    public int getCode() {
        return code;
    }
}