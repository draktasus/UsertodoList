package list;

import org.springframework.data.repository.CrudRepository;
import user.User;
import javax.transaction.Transactional;


public interface itemRepository extends CrudRepository<item, Long> {
    item findOneByIdAndList(Long id, list todoList,User owner);

    @Transactional
    void deleteByIdAndList(Long id, list todoList,User owner);
}