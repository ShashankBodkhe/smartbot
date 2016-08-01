package com.example;

import com.example.model.UserContext;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
public class ChatterbotController {
    private RestTemplate restTemplate;

    @CrossOrigin
    @RequestMapping(value = "/chatterbot/",method = RequestMethod.POST)
    public @ResponseBody String getResponse(@RequestParam String text){
        final String uri = "https://phuzzybot.herokuapp.com/chatterbot/";

        restTemplate = new RestTemplate();
        MultiValueMap<String, String> mvm = new LinkedMultiValueMap<>();
        mvm.add("text",text);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(mvm, headers);
        String response = restTemplate.postForObject(uri,requestEntity,String.class);
        return filterResponse(response);

    }

    @CrossOrigin
    @RequestMapping(value = "/contextLoad",method = RequestMethod.POST)
    public @ResponseBody Boolean loadContext(@RequestBody UserContext userContext){
        final String uri = "http://phuzzybot.herokuapp.com/contextLoad/";
        restTemplate = new RestTemplate();
        restTemplate.postForObject(uri,userContext,String.class);
        return false;
    }

    private String filterResponse(String response) {
        return response.replaceAll("[^\\w\\s.,?]","");
    }

}