using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace EventIdeasApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // הכתובת תהיה api/ideas
    public class IdeasController : ControllerBase
    {
        // רשימה סטטית בזיכרון השרת לשמירת הרעיונות
        private static readonly List<Idea> _ideas = new List<Idea>
        {
            new Idea { Id = "1", Name = "טורניר חשיבה", ActivityType = "משחק קבוצתי", TargetAudience = "נוער", Duration = 45, Status = "ממתין לאישור" }
        };

        // 1. getAll
        [HttpGet]
        public ActionResult<IEnumerable<Idea>> GetAll()
        {
            return Ok(_ideas);
        }

        // 2. getById
        [HttpGet("{id}")]
        public ActionResult<Idea> GetById(string id)
        {
            var idea = _ideas.FirstOrDefault(i => i.Id == id);
            if (idea == null) return NotFound();
            return Ok(idea);
        }

        // 3. insert (הוספה עם בדיקת כפילויות)
        [HttpPost]
        public ActionResult<Idea> Insert([FromBody] Idea newIdea)
        {
            // בדיקת כפילות ID או שם
            if (_ideas.Any(i => i.Id == newIdea.Id || i.Name.ToLower() == newIdea.Name.ToLower()))
            {
                return BadRequest("מזהה או שם הרעיון כבר קיימים במערכת.");
            }
            
            _ideas.Add(newIdea);
            return CreatedAtAction(nameof(GetById), new { id = newIdea.Id }, newIdea);
        }

        // 4. update (עדכון רעיון או סטטוס מנהל)
        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] Idea updatedIdea)
        {
            var existingIdea = _ideas.FirstOrDefault(i => i.Id == id);
            if (existingIdea == null) return NotFound();

            existingIdea.Name = updatedIdea.Name;
            existingIdea.ActivityType = updatedIdea.ActivityType;
            existingIdea.TargetAudience = updatedIdea.TargetAudience;
            existingIdea.Duration = updatedIdea.Duration;
            existingIdea.Status = updatedIdea.Status; // מאפשר גם עדכון סטטוס

            return NoContent();
        }

        // 5. delete
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var idea = _ideas.FirstOrDefault(i => i.Id == id);
            if (idea == null) return NotFound();

            _ideas.Remove(idea);
            return NoContent();
        }
    }
}