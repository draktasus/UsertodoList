package list;


import org.springframework.data.repository.CrudRepository;
import user.User;
import javax.transaction.Transactional;
import java.util.List;

public interface listRepository extends CrudRepository<list, Long> {
    List<list> findAllByOwner(User owner);

    list findOneByIdAndOwner(Long id, User owner);

    @Transactional
    void deleteByIdAndOwner(Long id, User owner);
}