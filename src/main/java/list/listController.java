package list;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import user.User;
import user.UserRepository;
import user.userRequest;
import user.userResponse;

@RestController
public class listController {

    @Autowired
    private listRepository repository;

    @Autowired
    private UserRepository userRepository;
 
    @Autowired
    private  itemRepository itemRepository;
    private User getOwnerFromAuthentication(Authentication authentication) {
        return (User) authentication.getPrincipal();
    }
    @PostMapping("/users")
    public ResponseEntity<userResponse> create(@RequestBody userRequest todoUserRequest,Authentication authentication) {
        User todoUser = userRepository.save(User.from(todoUserRequest));
        return new ResponseEntity<userResponse>(userResponse.from(todoUser),HttpStatus.CREATED);
    }
  
    @PostMapping("/lists")
    public ResponseEntity<listResponse> create(@RequestBody listRequest todoListRequest,Authentication authentication) {
        list todoList = repository.save(list.from(todoListRequest, getOwnerFromAuthentication(authentication)));
        return new ResponseEntity<listResponse>(listResponse.from(todoList),HttpStatus.CREATED);
    }

    @PostMapping("/lists/{id}/items")
    public ResponseEntity<itemResponse> createItem(@PathVariable("id") Long id, @RequestBody itemRequest todoItemRequest,@RequestBody listRequest todoListRequest,Authentication authentication ) {

    	list todoList =repository.findOneByIdAndOwner(id, getOwnerFromAuthentication(authentication));
        item todoItem = itemRepository.save(item.from(todoItemRequest, todoList));
        return new ResponseEntity<itemResponse>(itemResponse.from(todoItem),HttpStatus.CREATED);
    }
    @GetMapping("/users/{email}")
    public ResponseEntity<User> get(@PathVariable("email") String email, Authentication authentication) {
 
        return new ResponseEntity<User>(userRepository.findByEmail(email) ,HttpStatus.OK);
    }

    @GetMapping("/lists/{id}")
    public ResponseEntity<list> get(@PathVariable("id") Long id, Authentication authentication) {
 
        return new ResponseEntity<list>(repository.findOneByIdAndOwner(id,getOwnerFromAuthentication(authentication)), HttpStatus.OK);
    }
    @DeleteMapping("/lists/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id,
    		Authentication authentication) {
    	repository.deleteByIdAndOwner(id, getOwnerFromAuthentication(authentication));
        return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
    }
    @DeleteMapping("/lists/{id}/items/{itemId}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id,
                                         @PathVariable("itemId") Long itemId,
                                         Authentication authentication) {
    	
        list todoList =  repository.findOneByIdAndOwner(id, getOwnerFromAuthentication(authentication));
        itemRepository.deleteByIdAndList(itemId, todoList,getOwnerFromAuthentication(authentication));
        return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/lists/{id}/items/{itemId}")
    public ResponseEntity<item> get(@PathVariable("id") Long id,@PathVariable("itemId") Long itemId,Authentication authentication) {
    	list todoList =  repository.findOneByIdAndOwner(id, getOwnerFromAuthentication(authentication));
    	return new ResponseEntity<item>(itemRepository.findOneByIdAndList(itemId, todoList,getOwnerFromAuthentication(authentication)), HttpStatus.OK);
    }

    @PutMapping("/lists/{id}")
    public ResponseEntity<String> update(@PathVariable("id") Long id,
                                         @RequestBody listRequest request,
                                         Authentication authentication) {
        list todoList = repository.findOneByIdAndOwner(id, getOwnerFromAuthentication(authentication));
        todoList.merge(request);
        repository.save(todoList);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

 
  


}